`Git` 是一种分布式版本控制系统，它可以不受网络连接的限制，加上其它众多优点，目前已经成为程序开发人员做项目版本管理时的首选，非开发人员也可以用 `Git` 来做自己的文档版本管理工具。

本人底层码农一枚，在工作中不涉及管理代码等操作，主要流程是开发、合并、推送远程等。

先说比较实用的工作中用到的最多的 git 操作

`git clone`：从服务端拉取代码

```bash
git clone https://github.com/xxx.git
```

`git config`：配置开发者用户名和邮箱，如果需要配置全局就加上`--global`参数

```bash
git config user.name zhangqipeng
git config user.email zhangqipeng@qq.com
```

在拉下来代码并且配置好用户名邮箱之后，以下是我的个人的操作习惯，不喜勿喷。现在自己本地的 git 确立一个主分支，尽量和远程分支的分支名保持一致，一般是 test 分支或者 dev 分支（修改分支名一般使用`git branch -m oldname newname`），确定了 test 分支后，一般小的改动或者小的 bug 直接在 test 分支修改，修改后即可直接推送到远程分支；一般开发新的需求，使用 `git branch feature` 或者`git checkout -b feature`来创建新的 feature 分支，在该分支开发新的需求，一般在开发该需求的过程中，不会一次直接开发完，中间可能有其他事情需要转回原本的 test 分支，或者转去开发另一个新的 feature1 分支，此时需要把该分支的代码暂存，然后再转去其他的分支，即使用`git stash`来吧该分支的代码暂存到栈，再从其他分支回来继续开发该需求的时候，使用`git stash pop`来释放最后一次保存到栈里的代码并且把该代码从栈删除，或者使用`git stash apply stash@{2}`来释放栈里的指定的代码，同时可以使用`git stash list`来查看栈里的所有的保存的代码记录。在feature 分支代码开发完成后，使用`git add index.js`添加文件变动到暂存区，使用`git commit -m '提交原因'`提交改动到版本库。之后使用`git checkout test`返回主分支，执行`git merge feature`合并需求分支代码到主分支，执行`git branch -d feature`删除特征分支（一般在该需求上线后删除）。最后执行`git pull origin test`拉取线上代码，执行`git push myorigin test`把当前改动推送到远程版本库。

开发过程中可能有需要版本回退的情况，可以使用`git reset --hard commit_id`来回退到指定的版本，其中 `conmmit_id`可以使用`git log`来获取；要重返未来的版本，使用`git reflog`来获取指定的版本id

对于上面的操作，新手可能有部分看不懂的情况，下面逐个说一下上面命令的作用

`git branch`：创建、重命名、查看、删除项目分支

```bash
// 创建feature分支
git branch feature
// 重命名分支
git branch feature feature1
// 查看所有分支
git branch
// 删除分支
git branch -d feature1
```

`git checkout`：切换分支

```bash
// 创建分支
git checkout -b feature
// 切换分支
git checkout feature
```

`git add`：添加文件变动到暂存区

```bash
git add index.js
// 添加文件夹下所有变动到暂存区
git add .
```

`git commit`：提交文件变动到版本库

```bash
git commit -m '提交原因'
```

`git push`：将本地代码改动推送到服务器

```bash
git push origin test
```

`git pull`：将服务器的最新代码拉取到本地

```bash
git pull origin test
```

`git log`：查看版本提交记录

```bash
git log
```

`git stash`：把未提交的代码暂时保存在栈里

```bash
// 将未提交的代码保存到git栈中
git stash
// 查看栈中保存的列表
git stash list
// 从git栈中释放最新保存的一条记录，并把它从栈中移除
git stash pop
// 从git栈中释放指定的一条记录，并把它从栈中移除
git stash apply stash@{3}
// 清空栈
git stash clear
```
