/**
 * Google Sheets Service
 * Handles reading and aggregating data from Google Sheets
 */

const sheetsConfig = require('../config/sheetsConfig');

class SheetsService {
  constructor() {
    this.sheets = null;
    this.sheetId = null;
    this.cache = null;
    this.lastFetchTime = null;
    this.cacheDuration = 5000; // 5 seconds cache
    // Simple in-memory progress scores (replace with DB in production)
    this.userScores = new Map(); // key: lowercase user identifier (e.g., name/email), value: 0-100
  }

  async initialize() {
    await sheetsConfig.initialize();
    this.sheets = sheetsConfig.getSheetsInstance();
    this.sheetId = sheetsConfig.getSheetId();
    
    if (!this.sheets || !this.sheetId) {
      throw new Error('Google Sheets not initialized. Check your configuration.');
    }
  }

  /**
   * Get the first sheet name from the spreadsheet
   */
  async getFirstSheetName() {
    try {
      const response = await this.sheets.spreadsheets.get({
        spreadsheetId: this.sheetId,
      });
      const firstSheet = response.data.sheets[0];
      const sheetName = firstSheet.properties.title;
      console.log(`📋 Using sheet name: "${sheetName}"`);
      return sheetName;
    } catch (error) {
      console.error('Error getting sheet name:', error.message);
      
      // Try common Google Form response sheet names
      const commonNames = [
        'Form Responses 1',
        'Form Responses 2', 
        'Responses',
        'Sheet1',
        'TechPulse_Responses'
      ];
      
      console.log(`⚠️  Trying common sheet names: ${commonNames.join(', ')}`);
      return commonNames[0]; // Return first common name to try
    }
  }

  /**
   * Fetch all rows from the sheet
   */
  async fetchAllRows(range = null) {
    try {
      // If no range specified, get the first sheet name and use it
      let actualRange = range;
      if (!actualRange) {
        const sheetName = await this.getFirstSheetName();
        actualRange = sheetName;
      }

      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.sheetId,
        range: actualRange,
      });

      return response.data.values || [];
    } catch (error) {
      // If error is about range parsing, try common sheet names
      if (error.message && error.message.includes('Unable to parse range')) {
        console.log('🔄 Trying alternative sheet names...');
        
        const commonNames = [
          'Form Responses 1',
          'Form Responses 2',
          'Responses', 
          'TechPulse_Responses',
          'Sheet1'
        ];
        
        for (const sheetName of commonNames) {
          try {
            console.log(`   Trying: "${sheetName}"`);
            const response = await this.sheets.spreadsheets.values.get({
              spreadsheetId: this.sheetId,
              range: sheetName,
            });
            console.log(`✅ Success with: "${sheetName}"`);
            return response.data.values || [];
          } catch (tryError) {
            // Continue to next name
            continue;
          }
        }
      }
      
      console.error('Error fetching sheet data:', error.message);
      throw error;
    }
  }

  /**
   * Parse rows into structured data
   * Assumes first row is headers
   */
  parseRows(rows) {
    if (!rows || rows.length === 0) return [];

    const headers = rows[0].map(h => h.trim().toLowerCase());
    const data = [];

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const obj = {};
      
      headers.forEach((header, index) => {
        obj[header] = row[index] || '';
      });
      
      data.push(obj);
    }

    return data;
  }

  /**
   * Get cached data or fetch new
   */
  async getData(forceRefresh = false) {
    const now = Date.now();
    
    if (!forceRefresh && this.cache && this.lastFetchTime && (now - this.lastFetchTime) < this.cacheDuration) {
      return this.cache;
    }

    const rows = await this.fetchAllRows();
    const parsedData = this.parseRows(rows);
    
    this.cache = parsedData;
    this.lastFetchTime = now;
    
    return parsedData;
  }

  /**
   * Get total response count
   */
  async getTotalCount() {
    const data = await this.getData();
    return data.length;
  }

  /**
   * Aggregate technology usage
   */
  async getTechUsage() {
    const data = await this.getData();
    const techMap = {};

    data.forEach(row => {
      // Look for technology-related columns
      const techColumns = [
        'which tools or frameworks do you use in your daily work?',
        'which of the following technology areas are you interested in?'
      ];

      techColumns.forEach(col => {
        if (row[col]) {
          const techs = row[col].split(',').map(t => t.trim()).filter(t => t);
          techs.forEach(tech => {
            techMap[tech] = (techMap[tech] || 0) + 1;
          });
        }
      });
    });

    return Object.entries(techMap)
      .map(([tech, count]) => ({ tech, count }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Get learning interests (what people plan to learn)
   */
  async getLearningInterests() {
    const data = await this.getData();
    const interests = {};

    data.forEach(row => {
      const col = 'your target domain for new learning in next 1-2 years?';
      if (row[col]) {
        const domains = row[col].split(',').map(d => d.trim()).filter(d => d);
        domains.forEach(domain => {
          interests[domain] = (interests[domain] || 0) + 1;
        });
      }
    });

    return Object.entries(interests)
      .map(([domain, count]) => ({ domain, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10
  }

  /**
   * Get AI usage statistics
   */
  async getAIUsageStats() {
    const data = await this.getData();
    const stats = {
      never: 0,
      weekly: 0,
      daily: 0,
      multiple: 0
    };

    // Try different column names for AI usage
    const aiColumns = [
      'how often do you upskill or learn something new?',
      'how often do you use ai tools?'
    ];

    data.forEach(row => {
      aiColumns.forEach(col => {
        if (row[col]) {
          const value = row[col].toLowerCase();
          if (value.includes('never')) stats.never++;
          else if (value.includes('weekly')) stats.weekly++;
          else if (value.includes('daily')) stats.daily++;
          else if (value.includes('multiple')) stats.multiple++;
        }
      });
    });

    return stats;
  }

  /**
   * Get location/geo data
   */
  async getLocationData() {
    const data = await this.getData();
    const locations = {};

    data.forEach(row => {
      const locationKeys = ['location', 'city', 'college / current company name?'];
      locationKeys.forEach(key => {
        if (row[key]) {
          const loc = row[key].trim();
          if (loc) {
            locations[loc] = (locations[loc] || 0) + 1;
          }
        }
      });
    });

    return Object.entries(locations)
      .map(([location, count]) => ({ location, count }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Get age group distribution
   */
  async getAgeGroupDistribution() {
    const data = await this.getData();
    const ageGroups = {};

    data.forEach(row => {
      const col = 'which age group you belong to?';
      if (row[col]) {
        const age = row[col].trim();
        ageGroups[age] = (ageGroups[age] || 0) + 1;
      }
    });

    return Object.entries(ageGroups)
      .map(([age, count]) => ({ age, count }));
  }

  /**
   * Compute tutorials insights: overall and per-framework
   */
  async getTutorialInsights(frameworkFilter = null) {
    // Prefer explicit columns by letter: H (framework), I (tool), J (online source)
    // We'll read raw rows to ensure column indexing regardless of headers
    const rows = await this.fetchAllRows();
    if (!rows || rows.length === 0) {
      return { overall: { frameworks: [], learningMethods: [], onlineSources: [] }, perFramework: null };
    }

    // Skip header row (row 0)
    const dataRows = rows.slice(1);
    const COL_H = 7; // Framework name
    const COL_I = 8; // Most used tool for that respondent
    const COL_J = 9; // Most used online source for that respondent

    const normalize = (v) => String(v || '').trim();
    const toKey = (s) => normalize(s).toLowerCase();
    const isMeaningful = (s) => {
      const v = toKey(s);
      return v && v !== 'na' && v !== 'n/a' && v !== 'none' && v !== 'null';
    };
    const titleCase = (s) => String(s).replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.slice(1));
    const countMap = (map, key) => {
      if (!isMeaningful(key)) return;
      const k = toKey(key);
      map[k] = (map[k] || 0) + 1;
    };

    const splitList = (val) => String(val || '')
      .split(/[;,\/\n|]+/)
      .map(s => s.trim())
      .filter(Boolean);

    // Build overall frameworks list from H (split multiple values)
    const frameworkCounts = {};
    dataRows.forEach(r => {
      const list = splitList(r[COL_H]);
      list.forEach(fw => {
        if (!isMeaningful(fw)) return;
        const k = toKey(fw);
        frameworkCounts[k] = (frameworkCounts[k] || 0) + 1;
      });
    });

    const toSortedArray = (m) => Object.entries(m)
      .map(([name, count]) => ({ name: titleCase(name), count }))
      .sort((a, b) => b.count - a.count);

    const overall = {
      frameworks: toSortedArray(frameworkCounts)
    };

    if (frameworkFilter) {
      const fwKey = toKey(frameworkFilter);
      const toolCounts = {};
      const sourceCounts = {};

      dataRows.forEach(r => {
        const list = splitList(r[COL_H]);
        const matches = list.some(fw => isMeaningful(fw) && toKey(fw) === fwKey);
        if (!matches) return;
        const tool = r[COL_I];
        const source = r[COL_J];
        if (isMeaningful(tool)) {
          // Split multi-valued tools and count individually
          splitList(tool).forEach(t => countMap(toolCounts, t));
        }
        if (isMeaningful(source)) {
          // Split multi-valued sources and count individually
          splitList(source).forEach(s => countMap(sourceCounts, s));
        }
      });

      const sortedTools = toSortedArray(toolCounts);
      const topTool = sortedTools[0] || null;
      const otherTools = sortedTools.slice(1);
      const topOnlineSource = toSortedArray(sourceCounts)[0] || null;

      return {
        overall,
        framework: titleCase(frameworkFilter),
        topTool,
        topOnlineSource,
        otherTools
      };
    }

    // Fallback: also compute generic insights if needed (kept minimal here)
    return { overall, perFramework: null };

    
  }

  /**
   * Fetch a single user's profile details from sheet by email or name
   */
  async getUserProfile({ email = null, name = null } = {}) {
    const rows = await this.getData();
    if (!rows || rows.length === 0) return null;

    const toKey = (s) => String(s || '').trim().toLowerCase();

    const findKey = (obj, candidates) => {
      const keys = Object.keys(obj);
      const lower = keys.reduce((m, k) => { m[k.toLowerCase()] = k; return m; }, {});
      for (const c of candidates) {
        const hit = lower[c.toLowerCase()];
        if (hit) return hit;
      }
      return null;
    };

    let match = null;
    for (const row of rows) {
      const nameKey = findKey(row, ['name', 'full name', 'your name']);
      const emailKey = findKey(row, ['email', 'email address']);
      const rowName = nameKey ? row[nameKey] : '';
      const rowEmail = emailKey ? row[emailKey] : '';
      if (email && toKey(rowEmail) === toKey(email)) { match = row; break; }
      if (!match && name && toKey(rowName) === toKey(name)) { match = row; }
    }

    if (!match) return null;

    const nameKey = Object.keys(match).find(k => /name/i.test(k) && !/college|company/i.test(k));
    const emailKey = Object.keys(match).find(k => /email/i.test(k));
    const phoneKey = Object.keys(match).find(k => /(phone|mobile|contact)/i.test(k));
    const ageKey = Object.keys(match).find(k => /(age|which age group)/i.test(k));
    const orgKey = Object.keys(match).find(k => /(college|company|organization)/i.test(k));
    const locationKey = Object.keys(match).find(k => /(location|city)/i.test(k));

    return {
      name: (nameKey && match[nameKey]) || null,
      email: (emailKey && match[emailKey]) || null,
      phone: (phoneKey && match[phoneKey]) || null,
      age: (ageKey && match[ageKey]) || null,
      organization: (orgKey && match[orgKey]) || null,
      location: (locationKey && match[locationKey]) || null,
    };
  }

  numberToColumn(n) {
    let s = '';
    while (n > 0) {
      const m = (n - 1) % 26;
      s = String.fromCharCode(65 + m) + s;
      n = Math.floor((n - 1) / 26);
    }
    return s;
  }

  /**
   * Update user profile fields in the sheet (by email or name)
   */
  async updateUserProfile({ identifier, updates }) {
    if (!identifier || !updates) throw new Error('identifier and updates required');

    // Work with raw rows for precise column updates
    const sheetName = await this.getFirstSheetName();
    const rows = await this.fetchAllRows(sheetName);
    if (!rows || rows.length < 2) throw new Error('Sheet empty');

    const headers = rows[0].map(h => String(h || '').trim());
    const lowerHeaders = headers.map(h => h.toLowerCase());

    const idxOf = (predicates) => {
      for (let i = 0; i < lowerHeaders.length; i++) {
        const h = lowerHeaders[i];
        if (predicates.some(p => h.includes(p))) return i;
      }
      return -1;
    };

    const emailIdx = idxOf(['email']);
    const nameIdx = idxOf(['name']);

    // Find target row
    const ident = String(identifier).trim().toLowerCase();
    let rowIndex = -1; // zero-based
    for (let r = 1; r < rows.length; r++) {
      const rEmail = emailIdx >= 0 ? String(rows[r][emailIdx] || '').trim().toLowerCase() : '';
      const rName = nameIdx >= 0 ? String(rows[r][nameIdx] || '').trim().toLowerCase() : '';
      if (ident && (ident === rEmail || ident === rName)) { rowIndex = r; break; }
    }
    if (rowIndex < 0) throw new Error('User row not found');

    // Column indices for updatable fields
    const nameCol = nameIdx;
    const phoneCol = idxOf(['phone', 'mobile', 'contact']);
    const ageCol = idxOf(['age', 'which age group']);
    const orgCol = idxOf(['college', 'company', 'organization']);
    const locationCol = idxOf(['location', 'city']);

    const apply = (colIdx, key) => {
      if (colIdx >= 0 && Object.prototype.hasOwnProperty.call(updates, key)) {
        rows[rowIndex][colIdx] = updates[key];
      }
    };

    apply(nameCol, 'name');
    // email change (if supplied and column exists)
    if (emailIdx >= 0 && Object.prototype.hasOwnProperty.call(updates, 'email')) {
      rows[rowIndex][emailIdx] = updates.email;
    }
    apply(phoneCol, 'phone');
    apply(ageCol, 'age');
    apply(orgCol, 'organization');
    apply(locationCol, 'location');

    // Compute range for the entire row and write back
    const lastColLetter = this.numberToColumn(headers.length);
    const range = `${sheetName}!A${rowIndex + 1}:${lastColLetter}${rowIndex + 1}`;
    await this.sheets.spreadsheets.values.update({
      spreadsheetId: this.sheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [rows[rowIndex]] }
    });

    return { ok: true };
  }

  /**
   * Get ranking of users based on submission timestamp
   * Ranks users by when they submitted data (earliest = rank 1)
   */
  async getRanking() {
    try {
      const rows = await this.fetchAllRows();
      if (!rows || rows.length < 2) {
        return [];
      }

      const headers = rows[0].map(h => h.trim().toLowerCase());
      const data = [];

      // Find column indices
      const timestampIndex = headers.findIndex(h => 
        h.includes('timestamp') || h.includes('time')
      );
      const nameIndex = headers.findIndex(h => 
        h.includes('name') && !h.includes('college') && !h.includes('company')
      );
      const emailIndex = headers.findIndex(h => h.includes('email'));
      const collegeIndex = headers.findIndex(h => 
        h.includes('college') || h.includes('company')
      );

      // Process each data row
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (!row || row.length === 0) continue;

        const timestamp = row[timestampIndex] || '';
        const name = row[nameIndex] || row[emailIndex] || 'Anonymous';
        const college = row[collegeIndex] || 'Not specified';

        // Skip if no timestamp
        if (!timestamp) continue;

        // Parse timestamp (Google Forms format: MM/DD/YYYY HH:MM:SS)
        let timestampMs;
        try {
          const date = new Date(timestamp);
          timestampMs = date.getTime();
          
          // If date parsing fails, try alternative formats
          if (isNaN(timestampMs)) {
            // Try different date formats
            const parts = timestamp.split(/[\s\/\-]/);
            if (parts.length >= 3) {
              timestampMs = new Date(timestamp).getTime();
            }
          }
        } catch (e) {
          console.warn(`Could not parse timestamp: ${timestamp}`);
          continue;
        }

        if (!isNaN(timestampMs)) {
          data.push({
            name: name.trim() || 'Anonymous',
            college: college.trim() || 'Not specified',
            timestamp: timestamp.trim(),
            timestampMs: timestampMs
          });
        }
      }

      // Attach score from in-memory map if available
      const withScores = data.map((entry) => {
        const key = String(entry.name || '').toLowerCase();
        const score = this.userScores.get(key);
        return { ...entry, score: typeof score === 'number' ? score : null };
      });

      // Sort: if any scores exist, sort by score desc; otherwise by timestamp asc
      const hasAnyScores = withScores.some(e => typeof e.score === 'number');
      if (hasAnyScores) {
        withScores.sort((a, b) => {
          const as = typeof a.score === 'number' ? a.score : -Infinity;
          const bs = typeof b.score === 'number' ? b.score : -Infinity;
          if (bs !== as) return bs - as;
          return a.timestampMs - b.timestampMs;
        });
      } else {
        withScores.sort((a, b) => a.timestampMs - b.timestampMs);
      }

      // Add rank numbers
      return withScores.map((entry, index) => ({
        rank: index + 1,
        name: entry.name,
        college: entry.college,
        timestamp: entry.timestamp,
        score: entry.score ?? undefined,
      }));

    } catch (error) {
      console.error('Error getting ranking:', error);
      throw error;
    }
  }

  /**
   * Update a user's progress score used for ranking
   */
  setUserScore(userId, score) {
    if (!userId || typeof score !== 'number') return null;
    const key = String(userId).toLowerCase();
    const clamped = Math.max(0, Math.min(100, Math.round(score)));
    this.userScores.set(key, clamped);
    return { userId: key, score: clamped };
  }

  getUserScores() {
    return Array.from(this.userScores.entries()).map(([userId, score]) => ({ userId, score }));
  }

  /**
   * Get all aggregated data for dashboard
   */
  async getAllAggregatedData() {
    const [
      totalCount,
      techUsage,
      learningInterests,
      aiStats,
      locationData,
      ageGroups
    ] = await Promise.all([
      this.getTotalCount(),
      this.getTechUsage(),
      this.getLearningInterests(),
      this.getAIUsageStats(),
      this.getLocationData(),
      this.getAgeGroupDistribution()
    ]);

    return {
      totalResponses: totalCount,
      techUsage: techUsage.slice(0, 15), // Top 15
      learningInterests: learningInterests.slice(0, 5), // Top 5
      aiUsage: aiStats,
      locations: locationData.slice(0, 20), // Top 20
      ageGroups,
      lastUpdated: new Date().toISOString()
    };
  }
}

module.exports = new SheetsService();

