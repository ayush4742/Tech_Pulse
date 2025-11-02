# PowerShell script to kill process on port 5000

Write-Host "🔍 Finding process using port 5000..." -ForegroundColor Yellow

$process = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -First 1

if ($process) {
    Write-Host "✅ Found process: PID $process" -ForegroundColor Green
    Write-Host "🔪 Killing process..." -ForegroundColor Yellow
    
    Stop-Process -Id $process -Force
    
    Write-Host "✅ Process killed! You can now start your backend." -ForegroundColor Green
} else {
    Write-Host "❌ No process found on port 5000. Port is free." -ForegroundColor Red
}

Write-Host "`nPress any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

