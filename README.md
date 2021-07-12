# chapp-frontend

## Usage
Create a setuptools package from [MockgoDB](https://github.com/kimbauters/python-mockgodb), called `mockgo-0.2.1.tar.gz`, with the line `self.conn.execute("PRAGMA LOCKING_MODE = EXCLUSIVE")` removed from `mockgo/mockgo.py`. Then run the following:

```bash
git clone https://github.com/kevinmcareavey/chapp-setup.git
mv mockgo-0.2.1.tar.gz chapp-setup/
bash chapp-setup/setup.sh
```
