# Kill processes on ports 3000 and 5001

Write-Host "🔍 Checking ports 3000 and 5001..." -ForegroundColor Yellow

# Kill port 3000
$port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -First 1
if ($port3000) {
    Write-Host "🔪 Killing process on port 3000 (PID: $port3000)..." -ForegroundColor Yellow
    Stop-Process -Id $port3000 -Force -ErrorAction SilentlyContinue
    Write-Host "✅ Port 3000 freed" -ForegroundColor Green
} else {
    Write-Host "✅ Port 3000 is free" -ForegroundColor Green
}

# Kill port 5001
$port5001 = Get-NetTCPConnection -LocalPort 5001 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -First 1
if ($port5001) {
    Write-Host "🔪 Killing process on port 5001 (PID: $port5001)..." -ForegroundColor Yellow
    Stop-Process -Id $port5001 -Force -ErrorAction SilentlyContinue
    Write-Host "✅ Port 5001 freed" -ForegroundColor Green
} else {
    Write-Host "✅ Port 5001 is free" -ForegroundColor Green
}

Write-Host "`n✅ Done! You can now start your servers." -ForegroundColor Green

