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

