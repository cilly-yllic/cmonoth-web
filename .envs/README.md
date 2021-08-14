
```bash
$ brew install gpg2 gpg-agent pinentry-mac
```
暗号化
```bash
$ tar cf - dev | gpg -c -o dev.tar.gpg
```
復号化
```bash
$ gpg -o- dev.tar.gpg | tar xvf -
```
