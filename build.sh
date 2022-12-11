echo '开始执行构建'

git add .
git commit -m $1

git pull origin master
git push origin master

if [[ $2 == 1 ]]; then
  echo '开始打包'
  yarn deploy
fi