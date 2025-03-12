npm init -y && npm i puppeteer webdriverio


const capabilities = {
   platformName: "Android",
   "appium:deviceName": "vivo 1918",
   "appium:udid": "b503270",
   "appium:automationName": "UiAutomator2",
   "appium:ensureWebviewsHavePages": "true",
   "appium:nativeWebScreenshot": "true",
   "appium:newCommandTimeout": "3600",
   "appium:connectHardwareKeyboard": "true",
   "appium:appPackage": "com.ludashi.superboost",
   "appium:appActivity": "com.ludashi.superboost.MainActivity"
};


Mengecek udid Devices nya apa: = b503270
adb devices

Mengecek deviceName di ini: = vivo 1918
adb -s (masukan udid nya di sinih) shell getprop ro.product.model

Applikasi mana yg ingin di buka ketik: (buka dulu aplikasinya lalu jalankan ini)
adb shell dumpsys window windows


sebelum menjalankan programnya jalankan dulu servernya
jalankan dulu servernya di cmd ketik bisa berbagai macam cara tinggal pilih:
appium
appium -p 4723
appium --allow-insecure=adb_shell

sebelum menjalankan server lihat tutorialnya di :
https://www.youtube.com/watch?v=73wyQrkqyVU&list=PLW3Gs0ff2b78GK8zYyDF355d55s9kYLDa&index=5

kalau tidak ingin melihat tutorialnya tinggal : install node js
kalau sudah di install coba ketik di cmd :
node -v
kalau node js sudah di install tinggal install Appium : ketik di cmd = npm install appium
kalau appium sudah di install tinggal install appium-doctor : ketik di cmd = npm install appium-doctor
setelah selesai coba cek di cmd ketik = appium-doctor
setelah di ketik di cmd coba lihat apa saja yg diperlukan lagi di situ

jangan lupa install :
ANDROID_HOME : C:\Users\doaibu\AppData\Local\Android\Sdk
JAVA_HOME : C:\Program Files\Java\jdk-23

tambahkan di Environment Variables bagian System variables tinggal new ( tambahkan )



kalau tidak bisa di install coba ketik ini : untuk membersihkan cache lalu install ulang
npm cache clean --force
