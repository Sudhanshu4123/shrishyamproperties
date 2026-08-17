param(
    [string]$Command
)

$psi = New-Object System.Diagnostics.ProcessStartInfo
$psi.FileName = "c:\Users\user\Desktop\3d\plink.exe"
$psi.Arguments = "-ssh root@187.127.134.114 -pw `"`Shrishyam@2026#`"` `"$Command`""
$psi.UseShellExecute = $false
$psi.RedirectStandardOutput = $true
$psi.RedirectStandardError = $true
$psi.RedirectStandardInput = $true
$psi.CreateNoWindow = $true

$process = [System.Diagnostics.Process]::Start($psi)

# Automatically write 'y' to accept host key if prompted
$process.StandardInput.WriteLine("y")

$outStr = $process.StandardOutput.ReadToEnd()
$errStr = $process.StandardError.ReadToEnd()
$process.WaitForExit()

Write-Output "=== STDOUT ==="
Write-Output $outStr
Write-Output "=== STDERR ==="
Write-Output $errStr
