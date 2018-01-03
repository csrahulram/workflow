set devpath=%cd%
echo "Creating folder in c drive"
c:
mkdir mongo_data
start cmd.exe /k "%devpath:~0,2% cd %devpath% && npm run dev"
start cmd.exe /k "mongod --dbpath c:/mongo_data"
