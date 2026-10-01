# 環境構築（初日だけ）

3 つの言語を動かすために、次の 3 つを入れます。

| 道具 | 使う言語 | 必要なバージョン |
| --- | --- | --- |
| Node.js | JavaScript（答え合わせスクリプトも Node.js で動きます） | 20 以上（LTS 版がおすすめ） |
| Go | Go | 1.22 以上 |
| g++ | C++ | C++17 に対応したもの（GCC 9 以上 / macOS の Apple clang） |

## macOS

```bash
# C++ コンパイラ (g++ という名前で Apple clang が入ります)
xcode-select --install

# Homebrew を使う場合
brew install node go
```

Homebrew を使わない場合は、[Node.js 公式サイト](https://nodejs.org/ja) と [Go 公式サイト](https://go.dev/dl/) からインストーラーを入手できます。

## Windows

**WSL2（Windows 上で Linux を動かす仕組み）の利用をおすすめします。** C++ のコンパイラを用意しやすく、日本企業の開発環境（Linux サーバー）にも近いからです。

1. PowerShell を「管理者として実行」し、`wsl --install` を実行して再起動
2. スタートメニューから「Ubuntu」を開き、下の「Linux（Ubuntu）」の手順を実行

エディタの VS Code に拡張機能「WSL」を入れると、Windows 側の VS Code から WSL 内のファイルを編集できます。

## Linux（Ubuntu / WSL2）

```bash
# C++ コンパイラ
sudo apt update && sudo apt install -y build-essential

# Node.js (LTS)。nvm を使う方法:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
# ターミナルを開き直してから
nvm install --lts
```

Go は apt で入るバージョンが古いことがあるので、[Go 公式サイト](https://go.dev/dl/) の手順でインストールしてください。

```bash
# 例: ダウンロードした go1.xx.x.linux-amd64.tar.gz を展開する
sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.*.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc && source ~/.bashrc
```

## 確認

リポジトリのフォルダで次を実行し、3 つともバージョンが表示されれば準備完了です。

```bash
node --version
go version
g++ --version
node check.mjs      # Day 1〜3 が「… 途中」と表示されれば OK
```

## エディタ（おすすめ）

[VS Code](https://code.visualstudio.com/) に次の拡張機能を入れると、色分けや補完、保存時の自動整形が効きます。

| 拡張機能 | 用途 |
| --- | --- |
| Go（Go Team at Google） | Go の補完と、保存時の `gofmt` |
| C/C++（Microsoft） | C++ の補完とエラー表示 |
| ESLint | JavaScript のチェック（Day 25 以降で使います） |

JavaScript は拡張機能なしでも補完が効きます。
