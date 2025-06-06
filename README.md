# メモ管理システム - 進行中(2025/4/26)

## システム名  

個人メモ管理システム（MemoManager）

## 作成者  

汪 荷怡

---

## 目的

- JavaとSpring Bootを使って、シンプルなCRUD機能を実装する。
- 要件定義から実装までの開発プロセスを体験する。

## ディレクトリ

```
MemoManager
├── docs/                    # ドキュメントディレクトリ
│   ├── 基本設計書.md         # 基本設計書
│   ├── 詳細設計書.md         # 詳細設計書
│   ├── 要件定義書.md         # 要件定義書
│   ├── 過程中課題.md         # 過程中課題
│   └── プロジェクト作成（JAVA）.puml # プロジェクト作成のUML図
├── code/                    # コードディレクトリ
│   └── backend/             # バックエンドコードディレクトリ
│       ├── src/             # ソースコード
│           ├── main/        # メインアプリケーションコード
│           │   ├── java/    # Javaコード
│           │   └── resources/ # リソースファイル
│           └── test/        # テストコード
├── .gitignore               # Git 無視ファイル
├── LICENSE                  # ライセンスファイル
└── README.md                # プロジェクト概要ファイル
```

## 技術

- **フロントエンド（予定）**:
  React 18, React Router, React Hook Form, Axios
- **バックエンド**:
  java 24.0.1 SpringBoot 3.4.5, Maven 3.9.9
- **DB**:
  H2
- **テスト**: JUnit 5(spring-boot-starter-test)

## 環境構築

### フロントエンド

1. **依存関係のインストール**:
   cd frontend
   npm install
2. **開発サーバー起動**:
   npm run dev
3. **主要スクリプト**:

  npm run dev: 開発サーバーを起動 
  npm run build: 本番用ビルド
  npm run preview: ビルド後のプレビュー

### バックエンド

1. **依存関係のインストール**:
  cd backend
  mvn clean install
2. **アプリケーションの起動**:
  mvn spring-boot:run
3. **主要スクリプト**:
H2 コンソール: http://localhost:8080/h2-console

### 開発環境

OS: macOS
エディタ: Visual Studio Code
Node.js: 20.19.0
npm: 11.3.0
Java: 24.0.1
Maven: 3.9.9

