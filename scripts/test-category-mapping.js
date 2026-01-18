// カテゴリマッピングのテストスクリプト
const path = require('path');

// TypeScriptファイルを直接実行できないので、categories.tsの内容を確認
const fs = require('fs');
const categoriesFile = fs.readFileSync(path.join(__dirname, '../lib/constants/categories.ts'), 'utf8');

console.log('=== カテゴリ定義の確認 ===\n');

// 記事で使用されているカテゴリ名
const postCategories = ['投資', '子育て', 'ITエンジニア', '副業'];

// lib/constants/categories.tsで定義されているカテゴリ名を抽出
const nameMatches = categoriesFile.match(/name: "([^"]+)"/g);
if (nameMatches) {
  console.log('定義されているカテゴリ名:');
  nameMatches.forEach(match => {
    const name = match.match(/name: "([^"]+)"/)[1];
    console.log(`  - "${name}"`);
  });
}

console.log('\n記事で使用されているカテゴリ名:');
postCategories.forEach(cat => console.log(`  - "${cat}"`));

// cssClassを抽出
console.log('\n定義されているcssClass:');
const cssClassMatches = categoriesFile.match(/cssClass: "([^"]+)"/g);
if (cssClassMatches) {
  cssClassMatches.forEach(match => {
    const cssClass = match.match(/cssClass: "([^"]+)"/)[1];
    console.log(`  - "${cssClass}"`);
  });
}

// globals.cssで定義されているクラスを確認
console.log('\n=== globals.cssのクラス確認 ===\n');
const globalsFile = fs.readFileSync(path.join(__dirname, '../app/globals.css'), 'utf8');
const cssClasses = globalsFile.match(/\.post-category-\w+/g);
if (cssClasses) {
  const uniqueClasses = [...new Set(cssClasses)];
  console.log('定義されているCSSクラス:');
  uniqueClasses.forEach(cls => console.log(`  - ${cls}`));
}
