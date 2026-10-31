$ErrorActionPreference = 'Stop'
$projectRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
& node (Join-Path $projectRoot 'scripts\build-project-review.mjs')
if ($LASTEXITCODE -ne 0) { throw 'Falha ao gerar documentação e revisão' }
$deliveryRoot = Join-Path $projectRoot 'entrega\Marketplace-Local'
$sourceDestination = Join-Path $deliveryRoot 'codigo-fonte'
New-Item -ItemType Directory -Force -Path $sourceDestination | Out-Null
foreach ($folderName in @('prototype','docs','tests','scripts')) {
    Copy-Item -LiteralPath (Join-Path $projectRoot $folderName) -Destination $sourceDestination -Recurse -Force
}
foreach ($fileName in @('package.json','README.md','server.mjs')) {
    Copy-Item -LiteralPath (Join-Path $projectRoot $fileName) -Destination $sourceDestination -Force
}
$launcher = [System.IO.File]::ReadAllText((Join-Path $projectRoot 'ABRIR-MARKETPLACE.html'))
[System.IO.File]::WriteAllText((Join-Path $sourceDestination 'ABRIR-MARKETPLACE.html'), $launcher.Replace('entrega/Marketplace-Local/standalone/', '../standalone/'))
[System.IO.File]::WriteAllText((Join-Path $deliveryRoot 'ABRIR-MARKETPLACE.html'), $launcher.Replace('entrega/Marketplace-Local/standalone/', 'standalone/'))
Compress-Archive -LiteralPath $deliveryRoot -DestinationPath (Join-Path $projectRoot 'entrega\Marketplace-Local-standalone.zip') -Force
Get-Item -LiteralPath (Join-Path $projectRoot 'entrega\Marketplace-Local-standalone.zip') | Select-Object Name, Length, LastWriteTime
