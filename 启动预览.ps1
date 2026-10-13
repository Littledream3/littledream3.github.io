$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$blogNode = Get-Command node -ErrorAction SilentlyContinue
if (-not $blogNode) {
    $blogRuntime = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
    if (-not (Test-Path -LiteralPath $blogRuntime)) { throw '请安装 Node.js 后重试。' }
} else { $blogRuntime = $blogNode.Source }
& $blogRuntime node_modules/hexo/bin/hexo server --ip 127.0.0.1 --port 4000
