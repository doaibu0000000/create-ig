const { remote } = require('webdriverio');
const puppeteer = require('puppeteer');
const readline = require('readline');
const fs = require('fs')

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

const doaibu = {
   hostname: process.env.APPIUM_HOST || '0.0.0.0',
   port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
   logLevel: 'info',
   capabilities,
};

async function instagram() {
   let driver;
   try {
      driver = await remote(doaibu);
      async function programDilanjutkan(driver) {
         const packageName = 'com.ludashi.superboost';
         await driver.pressKeyCode(3);

         await driver.execute('mobile: shell', {
            command: 'pm clear',
            args: [packageName],
            includeStderr: true,
            timeout: 5000
         });

         throw new Error();
      }
      const startTimeSeluruh = new Date();
      const fileName = 'nama.txt';
      if (!fs.existsSync(fileName)) {
         fs.writeFileSync(fileName, '', 'utf-8');
      }

      const doaibuNama = fs.readFileSync('nama.txt', 'utf-8').split('\n').filter(Boolean);
      const email = doaibuNama.map(nama => nama.replace(/\s+/g, '').toLowerCase() + '@akunlama.com');
      const sandi = doaibuNama.map(nama => nama.replace(/\s+/g, '').toLowerCase() + '*');

      try {
         const buttonAgree = await driver.$('android=resourceId("com.ludashi.superboost:id/btn_start")');
         await buttonAgree.waitForDisplayed({ timeout: 10000 });
         await buttonAgree.click();
      } catch (e) {
         throw new Error();
      }

      try {
         const gridView = await driver.$('android=resourceId("com.ludashi.superboost:id/iv_appicon")');
         await gridView.waitForDisplayed({ timeout: 10000 });
         await gridView.click();
      } catch (e) {
         throw new Error();
      }

      await driver.toggleAirplaneMode();
      await driver.toggleAirplaneMode();
      await driver.pause(2000);

      try {
         const clickInstagram = await driver.$('android=resourceId("com.ludashi.superboost:id/iv_appicon")');
         await clickInstagram.waitForDisplayed({ timeout: 10000 });
         await clickInstagram.click();
      } catch (e) {
         throw new Error();
      }

      try {
         const clickTurnOn = await driver.$('android=resourceId("com.ludashi.superboost:id/btn_turn_on")');
         await clickTurnOn.waitForDisplayed({ timeout: 10000 });
         await clickTurnOn.click();
      } catch (e) {
         throw new Error();
      }

      try {
         const buttonIzinkan = await driver.$('android=resourceId("com.android.permissioncontroller:id/permission_allow_button")');
         await buttonIzinkan.waitForDisplayed({ timeout: 10000 });
         await buttonIzinkan.click();
      } catch (e) {
         throw new Error();
      }

      // Button Buat akun baru
      try {
         const buatAkunBaru = await driver.$('//android.view.View[@content-desc="Buat akun baru"]');
         await buatAkunBaru.waitForDisplayed({ timeout: 60000 });
         await buatAkunBaru.click();
      } catch (e) {
         throw new Error();
      }

      // Button Daftar dengan email
      try {
         const daftarDenganEmail = await driver.$('//android.view.View[@content-desc="Daftar dengan email"]');
         await daftarDenganEmail.waitForDisplayed({ timeout: 10000 });
         await daftarDenganEmail.click();
      } catch (e) {
         throw new Error();
      }

      // From masukan Email
      try {
         const masukanEmail = await driver.$('//android.widget.EditText');
         await masukanEmail.waitForDisplayed({ timeout: 10000 });
         await masukanEmail.click();
         await masukanEmail.setValue(email[0]);
      } catch (e) {
         console.log(`\x1b[31mEmail Kosong tolong di isi terlebih dahulu di file\x1b[0m \x1b[35m(\x1b[0m \x1b[32mnama.txt\x1b[0m \x1b[35m)\x1b[0m`);
         console.log(`
            \x1b[35mContoh cara isi file nya di :\x1b[0m \x1b[35m(\x1b[0m \x1b[32mnama.txt\x1b[0m \x1b[35m)\x1b[0m
            \x1b[32mAgung Ajalah\x1b[0m
            \x1b[32mIrfan Nurahman\x1b[0m
            \x1b[32mRoza Maulana\x1b[0m
            \x1b[35mISI SEBANYAK MUNGKIN JANGAN SAMPAI\x1b[0m \x1b[32mKOSONG!\x1b[0m
         `);
         throw new Error();
      }

      // Button Berikutnya (email)
      try {
         const buttonBerikutnya = await driver.$('//android.view.View[@content-desc="Berikutnya"]');
         await buttonBerikutnya.waitForDisplayed({ timeout: 10000 });
         await buttonBerikutnya.click();
      } catch (e) {
         throw new Error();
      }

      try {
         console.log('Proses Memasukan Otp...');
         const browser = await puppeteer.launch({
            headless: true, args: [
               '--window-size=500,790',
               // '--window-position=1411,4'
               '--window-position=14111,4'
            ]
         });
         const page = await browser.newPage();
         page.setViewport({ width: 500, height: 700, deviceScaleFactor: 1 });
         const allPage = await browser.pages();
         if (allPage.length > 1) {
            allPage[0].close();
         }

         await page.goto('https://akunlama.com', { waitUntil: 'networkidle2' });
         await page.waitForSelector('.submit', { timeout: 10000 });
         await page.click('.submit');

         await page.waitForSelector('#email-input', { timeout: 10000 });
         await page.click('#email-input');

         await page.keyboard.down('Control');
         await page.keyboard.press('A');
         await page.keyboard.up('Control');
         await page.keyboard.press('Backspace');

         await page.type('#email-input', email[0]);

         await page.waitForSelector('.submit', { timeout: 10000 });
         await page.click('.submit');

         async function waitForElementAndFetchOTP() {
            while (true) {
               await new Promise((d) => setTimeout(d, 500));
               await page.reload();

               const elementExists = await page.$$eval('.row-subject', elements => elements.length > 0);
               if (elementExists) {
                  let text = await page.$$eval('.row-subject', otp => otp[0].textContent);
                  const otp = text.match(/\b\d{6}\b/g);

                  const masukanKodeOtp = await driver.$('//android.widget.EditText');
                  await masukanKodeOtp.waitForDisplayed({ timeout: 10000 });
                  await masukanKodeOtp.setValue(otp[0]);
                  console.log(`Kode OTP : ${otp[0]}`);
                  break;
               } else {
                  console.log('Menunggu Kode OTP...');
               }
            }
         }
         await waitForElementAndFetchOTP();

         await browser.close();
      } catch (e) {
         throw new Error();
      }

      try {
         const buttonBerikutnya2 = await driver.$('//android.view.View[@content-desc="Berikutnya"]');
         await buttonBerikutnya2.waitForDisplayed({ timeout: 10000 });
         await buttonBerikutnya2.click();
      } catch (e) {
         throw new Error();
      }

      // Menghapus nama (nama.txt)
      let doaibuNames = fs.readFileSync('nama.txt', 'utf-8').split('\n').filter(Boolean);
      doaibuNames = doaibuNames.slice(1);
      fs.writeFileSync('nama.txt', doaibuNames.join('\n'));

      // From Masukan Kata Sandi
      try {
         const masukanSandi = await driver.$('//android.widget.EditText');
         await masukanSandi.waitForDisplayed({ timeout: 10000 });
         await masukanSandi.click();
         await masukanSandi.setValue(sandi[0]);
      } catch (e) {
         throw new Error();
      }

      // Button Berikutnya (kata sandi)
      try {
         const buttonBerikutnya3 = await driver.$('//android.view.View[@content-desc="Berikutnya"]');
         await buttonBerikutnya3.waitForDisplayed({ timeout: 10000 });
         await buttonBerikutnya3.click();
      } catch (e) {
         throw new Error();
      }

      //===============================================
      //                    Tanggal
      //===============================================
      try {
         await driver.pause(500);
         const taggalLahir = await driver.$('android=resourceId("android:id/alertTitle")');
         await taggalLahir.waitForDisplayed({ timeout: 10000 });
         const tanggals = [];
         const today = new Date();
         const currentDate = today.getDate().toString().padStart(2, '0');
         for (let i = currentDate - 1; i <= 31; i++) {
            const textValue = i.toString().padStart(2, '0');
            tanggals.push(`//android.widget.EditText[@resource-id="android:id/numberpicker_input" and @text="${textValue}"]`);
         }
         try {
            for (const tanggall of tanggals) {
               const tanggalRandom = Math.floor(Math.random() * 31) + 1;
               const tanggal = await driver.$(tanggall);
               if (await tanggal.isDisplayed()) {
                  await tanggal.waitForDisplayed({ timeout: 10000 });
                  await tanggal.click();
                  await tanggal.setValue(tanggalRandom.toString().padStart(2, '0'));
                  break;
               }
            }
         } catch (e) {
            throw new Error();
         }
      } catch (e) {
         throw new Error();
      }
      //===============================================
      //                    Bulan
      //===============================================
      try {
         const today = new Date();
         const bulanArray = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
         const currentMonth = today.getMonth();
         const monthName = bulanArray[currentMonth];

         const bulanXpath = `//android.widget.EditText[@resource-id="android:id/numberpicker_input" and @text="${monthName}"]`;
         const bulan = await driver.$(bulanXpath);
         if (await bulan.isDisplayed()) {
            await bulan.waitForDisplayed({ timeout: 10000 });
            await bulan.click();
            const bulanRandom = bulanArray[Math.floor(Math.random() * bulanArray.length)];
            await bulan.setValue(bulanRandom);
         }
      } catch (e) {
         throw new Error();
      }
      //===============================================
      //                    Tahun
      //===============================================
      try {
         const tahunArray = [];
         for (let i = 2025; i <= 2030; i++) {
            tahunArray.push(i.toString());
         }
         const tahunXpaths = tahunArray.map(tahun => `//android.widget.EditText[@resource-id="android:id/numberpicker_input" and @text="${tahun}"]`);
         try {
            for (const tahunXpath of tahunXpaths) {
               const tahunRandom = Math.floor(Math.random() * (2007 - 1997 + 1)) + 1998;
               const tahun = await driver.$(tahunXpath);
               if (await tahun.isDisplayed()) {
                  await tahun.waitForDisplayed({ timeout: 10000 });
                  await tahun.click();
                  await tahun.setValue(tahunRandom);
                  break;
               }
            }
         } catch (e) {
            throw new Error();
         }
      } catch (e) {
         throw new Error();
      }

      // Button Atur (Done)
      try {
         const buttonAtur = await driver.$('android=resourceId("android:id/button1")');
         await buttonAtur.waitForDisplayed({ timeout: 10000 });
         await buttonAtur.click();
      } catch (e) {
         throw new Error();
      }

      // Button Berikutnya (Atur tanggal/bulan/tahun);
      try {
         await driver.pause(500);
         const buttonBerikutnya4 = await driver.$('//android.view.View[@content-desc="Berikutnya"]');
         await buttonBerikutnya4.waitForDisplayed({ timeout: 10000 });
         await buttonBerikutnya4.click();
      } catch (e) {
         throw new Error();
      }

      // Siapa nama Anda (from nama)
      try {
         await driver.pause(500);
         const namaLengkap = await driver.$('//android.widget.EditText');
         await namaLengkap.waitForDisplayed({ timeout: 10000 });
         await namaLengkap.click();
         await namaLengkap.setValue(doaibuNama[0]);
      } catch (e) {
         throw new Error();
      }

      // Button Berikutnya (from nama)
      try {
         const buttonBerikutnya5 = await driver.$('//android.view.View[@content-desc="Berikutnya"]');
         await buttonBerikutnya5.waitForDisplayed({ timeout: 10000 });
         await buttonBerikutnya5.click();
      } catch (e) {
         throw new Error();
      }

      // Button Saya Setuju
      try {
         await driver.pause(1500);
         const buttonSayaSetuju = await driver.$('//android.view.View[@content-desc="Saya setuju"]');
         await buttonSayaSetuju.waitForDisplayed({ timeout: 10000 });
         await buttonSayaSetuju.click();
      } catch (e) {
         throw new Error();
      }

      // Button Lewati ( Tambahkan foto profile )
      try {
         const buttonLewati = await driver.$('//android.view.View[@content-desc="Lewati"]');
         await buttonLewati.waitForDisplayed({ timeout: 100000 });
         await buttonLewati.click();
      } catch (e) {
         throw new Error();
      }

      // Menyimpan Sandi dan Email ke ( doaibuNo2Fa.txt )
      try {
         const element = await driver.$('//android.view.View[contains(@content-desc, "Selamat Datang di Instagram,")]');
         await element.waitForDisplayed({ timeout: 10000 });
         const contentDesc = await element.getAttribute('content-desc');
         const regex = /Selamat Datang di Instagram, (.+)/;
         const match = contentDesc.match(regex);

         let username = '';
         if (match && match[1]) {
            username = match[1].trim();
         }

         const filePath = 'doaibuNo2Fa.txt';
         if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, `${username} | ${sandi[0]} | ${email[0]}`);
         } else {
            const savedData = fs.readFileSync(filePath, 'utf8');
            if (savedData.trim() === '') {
               fs.writeFileSync(filePath, `${username} | ${sandi[0]} | ${email[0]}`);
            } else {
               fs.appendFileSync(filePath, `\n${username} | ${sandi[0]} | ${email[0]}`);
            }
         }
      } catch (e) {
         throw new Error();
      }

      // Button Selanjutnya ( Akses ke Kontak  untuk mempermudah mencari teman );
      try {
         const buttonSelenjutnya = await driver.$('android=resourceId("com.instagram.android:id/button_text")');
         await buttonSelenjutnya.waitForDisplayed({ timeout: 10000 });
         await buttonSelenjutnya.click();
      } catch (e) {
         throw new Error();
      }

      // Button Tolak ( PopUp izinkan DualSpace )
      try {
         const buttonTolak = await driver.$('android=resourceId("com.android.permissioncontroller:id/permission_deny_button")');
         await buttonTolak.waitForDisplayed({ timeout: 10000 });
         await buttonTolak.click();
      } catch (e) {
         throw new Error();
      }

      // Button Batal ( Buka Pengaturan, lalu ketuk izin dan aktifkan kontak )
      try {
         const buttonBatal = await driver.$('android=resourceId("com.instagram.android:id/negative_button")');
         await buttonBatal.waitForDisplayed({ timeout: 10000 });
         await buttonBatal.click();
      } catch (e) {
         throw new Error();
      }

      // Button Lewati ( Mengizinkan Kontak )
      try {
         const buttonLewati2 = await driver.$('android=resourceId("com.instagram.android:id/skip_button")');
         await buttonLewati2.waitForDisplayed({ timeout: 10000 });
         await buttonLewati2.click();
      } catch (e) {
         throw new Error();
      }

      try {
         await driver.pause(1000);
         const elements = [
            '//android.widget.Button[@resource-id="com.instagram.android:id/action_bar_action_text"]',
            '//android.widget.Button[@content-desc="Selanjutnya"]/android.widget.ImageView',
            '//android.widget.Button[@resource-id="com.instagram.android:id/skip_button"]',
            '//android.widget.Button[@resource-id="com.instagram.android:id/negative_button"]',
            '//android.widget.RelativeLayout[@resource-id="com.instagram.android:id/bottom_option_container"]',
            '//android.widget.Button[@resource-id="com.instagram.android:id/button_text"]',
            'android=resourceId("com.instagram.android:id/skip_button")'
         ];

         const executedElements = new Set();
         let profileFound = false;

         async function clickVisibleElementAndCheckProfile(xpathList) {
            for (const xpath of xpathList) {
               if (!executedElements.has(xpath)) {
                  try {
                     const element = await driver.$(xpath);
                     if (await element.isDisplayed()) {
                        await element.waitForDisplayed({ timeout: 10000 });
                        await element.click();

                        executedElements.add(xpath);

                        const elementProfile = await driver.$('android=resourceId("com.instagram.android:id/tab_avatar")');
                        if (await elementProfile.isDisplayed()) {
                           await elementProfile.waitForDisplayed({ timeout: 10000 });
                           await driver.pause(1500);
                           await elementProfile.click();

                           const profile = await driver.$('android=resourceId("com.instagram.android:id/row_profile_header")');
                           if (await profile.isDisplayed()) {
                              profileFound = true; // Set profileFound to true
                              return true;
                           }
                        }
                     }
                  } catch (error) {
                     continue;
                  }
               }
            }
            return false;
         }

         for (let i = 0; i < 4; i++) {
            if (profileFound) break;
            profileFound = await clickVisibleElementAndCheckProfile(elements);
         }

         if (!profileFound) {
            for (let i = 0; i < 4; i++) {
               if (profileFound) break;
               await clickVisibleElementAndCheckProfile(elements);
            }
         }
      } catch (e) {
         console.log(`\x1b[31mTerjadi Error\x1b[0m \x1b[32mBagian Profile\x1b[0m`);
         throw new Error();
      }

      // Ikuti Orang
      try {
         const IkutiOrang = await driver.$('android=resourceId("com.instagram.android:id/suggested_user_card_follow_button")');
         await IkutiOrang.waitForDisplayed({ timeout: 10000 });
         const OrangPertama = await driver.$('(//android.widget.LinearLayout[@resource-id="com.instagram.android:id/suggested_entity_card_container"])[1]');
         const buttonIkutiPertama = await OrangPertama.$('//android.widget.Button[contains(@content-desc, "Ikuti")]');
         if (await buttonIkutiPertama.isDisplayed()) {
            await buttonIkutiPertama.click();
         }
      } catch (e) {
         throw new Error();
      }

      // Ikuti Orang ke 2
      try {
         const IkutiOrang = await driver.$('android=resourceId("com.instagram.android:id/suggested_user_card_follow_button")');
         await IkutiOrang.waitForDisplayed({ timeout: 10000 });
         const OrangDua = await driver.$('(//android.widget.LinearLayout[@resource-id="com.instagram.android:id/suggested_entity_card_container"])[2]');
         const buttonIkutiDua = await OrangDua.$('//android.widget.Button[contains(@content-desc, "Ikuti")]');
         if (await buttonIkutiDua.isDisplayed()) {
            await buttonIkutiDua.click();
         }
      } catch (e) {
         throw new Error();
      }

      try {
         const { width, height } = await driver.getWindowRect();
         const startX = Math.floor(width / 2);
         const startYDown = Math.floor(height * 0.8);
         const endYDown = Math.floor(height * 0.2);
         const startYUp = Math.floor(height * 0.2);
         const endYUp = Math.floor(height * 0.8);

         for (let i = 0; i < 2; i++) {
            // Scroll ke bawah
            await driver.performActions([
               {
                  type: 'pointer', id: 'finger1', parameters: { pointerType: 'touch' }, actions: [
                     { type: 'pointerMove', duration: 0, x: startX, y: startYDown },
                     { type: 'pointerDown', button: 0 },
                     { type: 'pause', duration: 200 },
                     { type: 'pointerMove', duration: 200, origin: 'viewport', x: startX, y: endYDown },
                     { type: 'pointerUp', button: 0 }
                  ]
               }
            ]);
            await driver.releaseActions();

            // Scroll ke atas
            await driver.performActions([
               {
                  type: 'pointer', id: 'finger1', parameters: { pointerType: 'touch' }, actions: [
                     { type: 'pointerMove', duration: 0, x: startX, y: startYUp },
                     { type: 'pointerDown', button: 0 },
                     { type: 'pause', duration: 200 },
                     { type: 'pointerMove', duration: 200, origin: 'viewport', x: startX, y: endYUp },
                     { type: 'pointerUp', button: 0 }
                  ]
               }
            ]);
            await driver.releaseActions();
         }
      } catch (e) {
         throw new Error();
      }

      const username = await driver.$('//android.widget.Button[@resource-id="com.instagram.android:id/action_bar_large_title_auto_size"]');
      const usernameValue = await username.getAttribute('content-desc');

      // Titik tiga di sebelah kanan Profile ( Opsi )
      try {
         const menuPilihan = await driver.$('//android.widget.Button[@content-desc="Opsi"]');
         await menuPilihan.waitForDisplayed({ timeout: 10000 });
         await menuPilihan.click();
      } catch (e) {
         throw new Error();
      }

      // Pusat Akun
      try {
         const buttonPusatAkun = await driver.$('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View[2]/android.view.View[1]/android.view.View[2]');
         await buttonPusatAkun.waitForDisplayed({ timeout: 10000 });
         await buttonPusatAkun.click();
      } catch (e) {
         throw new Error();
      }

      try {
         const halamanSaatIniTidakTersedia = await driver.$('//android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout[2]/android.widget.ImageView');
         if (await halamanSaatIniTidakTersedia.isDisplayed()) {
            await halamanSaatIniTidakTersedia.waitForDisplayed({ timeout: 10000 });
            await halamanSaatIniTidakTersedia.click();
            await programDilanjutkan(driver);
         }
      } catch (e) {
         throw new Error();
      }

      // Kata Sandi Dan Keamanan
      try {
         const buttonKataSandiDanKeamanan = await driver.$('//android.view.View[@content-desc="Kata sandi dan keamanan"]');
         await buttonKataSandiDanKeamanan.waitForDisplayed({ timeout: 10000 });
         await buttonKataSandiDanKeamanan.click();
      } catch (e) {
         throw new Error();
      }

      // Autentikasi dua Faktor
      try {
         const buttonAutentikasiDuaFaktor = await driver.$('//android.view.View[@content-desc="Autentikasi dua faktor"]');
         await buttonAutentikasiDuaFaktor.waitForDisplayed({ timeout: 10000 });
         await buttonAutentikasiDuaFaktor.click();
      } catch (e) {
         throw new Error();
      }

      // Pilih Akun Autentikasi dua-faktor
      try {
         const buttonAkunAutentikasiDuaFaktor = await driver.$('//android.view.View[@content-desc="Instagram"]');
         await buttonAkunAutentikasiDuaFaktor.waitForDisplayed({ timeout: 10000 });
         await buttonAkunAutentikasiDuaFaktor.click();
      } catch (e) {
         throw new Error();
      }

      // Tambahkan Keamanan Ekstra ke Akun Anda
      try {
         const buttonTambahkanKeamananDuaFaktor = await driver.$('//android.view.View[@content-desc="Berikutnya"]');
         await buttonTambahkanKeamananDuaFaktor.waitForDisplayed({ timeout: 10000 });
         await buttonTambahkanKeamananDuaFaktor.click();
      } catch (e) {
         throw new Error();
      }

      // Petunjuk Penyiapan
      try {
         const salin2Fa = await driver.$('//android.view.View[@content-desc="Salin kunci"]');
         await salin2Fa.waitForDisplayed({ timeout: 10000 });
         await salin2Fa.click();
      } catch (e) {
         throw new Error();
      }

      try {
         const clipboardText = await driver.getClipboard();
         const decodedText = Buffer.from(clipboardText, 'base64').toString('utf8');
         const duaFa = decodedText;

         const filePath = 'doaibu2Fa.txt';
         if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, `${usernameValue} | ${duaFa} | ${sandi[0]} | ${email[0]}`);
         } else {
            const savedData = fs.readFileSync(filePath, 'utf8');
            if (savedData.trim() === '') {
               fs.writeFileSync(filePath, `${usernameValue} | ${duaFa} | ${sandi[0]} | ${email[0]}`);
            } else {
               fs.appendFileSync(filePath, `\n${usernameValue} | ${duaFa} | ${sandi[0]} | ${email[0]}`);
            }
         }
      } catch (e) {
         throw new Error();
      }

      // Button Petunjuk Penyiapan ( Berikutnya )
      try {
         const button2FaBerikutnya = await driver.$('//android.view.View[@content-desc="Berikutnya"]');
         await button2FaBerikutnya.waitForDisplayed({ timeout: 10000 });
         await button2FaBerikutnya.click();
      } catch (e) {
         throw new Error();
      }

      try {
         const filePath = 'doaibu2Fa.txt';
         const fileContent = fs.readFileSync(filePath, 'utf8').trim();
         const lines = fileContent.split('\n');
         const lastLine = lines[lines.length - 1];
         const parts = lastLine.split('|');
         const duaFa = parts[1].trim();

         const browser2 = await puppeteer.launch({
            headless: true, args: [
               '--window-size=500,790',
               // '--window-position=1411,4'
               '--window-position=14111,4'
            ]
         });
         const newPage = await browser2.newPage();
         newPage.setViewport({ width: 500, height: 700, deviceScaleFactor: 1 });
         const allPagee = await browser2.pages();
         if (allPagee.length > 1) {
            allPagee[0].close();
         }

         await newPage.goto('https://2fa.live/', { waitUntil: 'networkidle2' });
         await newPage.waitForSelector('#listToken');
         await newPage.click('#listToken');
         await newPage.type('#listToken', `${duaFa}`);

         await new Promise((d) => setTimeout(d, 500));

         await newPage.waitForSelector('#submit');
         await newPage.click('#submit');
         await new Promise((d) => setTimeout(d, 1500));
         await newPage.waitForSelector('#output');
         const kode2FA = await newPage.$eval('#output', el => el.value);
         const otp2Fa = kode2FA.match(/\d{6}/)[0];

         // Masukan Kode
         const fromMasukanKode2Fa = await driver.$('//android.widget.EditText');
         if (await fromMasukanKode2Fa.isDisplayed() && await fromMasukanKode2Fa.isEnabled()) {
            await fromMasukanKode2Fa.waitForDisplayed({ timeout: 10000 });
            await fromMasukanKode2Fa.click();
            await fromMasukanKode2Fa.setValue(otp2Fa);
         }
         await browser2.close();
      } catch (e) {
         throw new Error();
      }

      // Button Masukan kode
      try {
         const buttonKode2FaBerikutnya = await driver.$('//android.view.View[@content-desc="Berikutnya"]');
         await buttonKode2FaBerikutnya.waitForDisplayed({ timeout: 10000 });
         await buttonKode2FaBerikutnya.click();
      } catch (e) {
         throw new Error();
      }

      // Button (Selesai)
      try {
         const buttonSelesai = await driver.$('//android.view.View[@content-desc="Selesai"]');
         await buttonSelesai.waitForDisplayed({ timeout: 10000 });
         await buttonSelesai.click();
      } catch (e) {
         throw new Error();
      }

      try {
         const filePath = 'doaibuNo2Fa.txt';
         const fileContent = fs.readFileSync(filePath, 'utf8').trim();
         const lines = fileContent.split('\n');
         const lastLine = lines[lines.length - 1];
         const parts = lastLine.split('|');
         const email = parts[2].trim();

         const filePath2 = 'doaibu2Fa.txt';
         const fileContent2 = fs.readFileSync(filePath2, 'utf8').trim();
         const lines2 = fileContent2.split('\n');
         const lastLine2 = lines2[lines2.length - 1];
         const parts2 = lastLine2.split('|');
         const email2 = parts2[3].trim();

         if (email === email2) {
            let doaibuNames = fs.readFileSync('doaibuNo2Fa.txt', 'utf-8').split('\n').filter(Boolean);
            doaibuNames.pop();
            fs.writeFileSync('doaibuNo2Fa.txt', doaibuNames.join('\n'));
            console.log('Baris paling terakhir telah dihapus dari file doaibuNo2Fa.txt');
         } else {
            console.log('Tidak ada email yang sama ditemukan.');
         }
      } catch (e) {
         throw new Error();
      }

      const packageName = 'com.ludashi.superboost';
      await driver.pressKeyCode(3);

      await driver.execute('mobile: shell', {
         command: 'pm clear',
         args: [packageName],
         includeStderr: true,
         timeout: 5000
      });

      const endTimeSeluruh = new Date();
      const elapsedTime = (endTimeSeluruh - startTimeSeluruh) / 1000;
      let elapsedDisplay;
      if (elapsedTime < 60) {
         elapsedDisplay = `${elapsedTime.toFixed(0).padStart(3, ' ')}${' '.repeat(1)}detik`;
      } else {
         const elapsedMinutes = elapsedTime / 60;
         if (elapsedMinutes < 10) {
            elapsedDisplay = `${elapsedMinutes.toFixed(1)}${' '.repeat(1)}menit`;
         } else {
            elapsedDisplay = `${elapsedMinutes.toFixed(0)}${' '.repeat(1)}menit`;
         }
      }
      console.log(`\x1b[35mWAKTU${' '.repeat(1)}YANG${' '.repeat(1)}TELAH${' '.repeat(1)}DI${' '.repeat(1)}GUNAKAN\x1b[0m = \x1b[32m${elapsedDisplay}\x1b[0m`);

   } catch (error) {
      throw new Error();
   }
};

async function main() {
   const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
   });
   console.log(`
      888888ba${' '.repeat(23)}dP${' '.repeat(1)}dP
      88${' '.repeat(4)}\x1b[32m\`\x1b[0m8b${' '.repeat(22)}88${' '.repeat(1)}88
      88${' '.repeat(5)}88${' '.repeat(1)}\x1b[32m\.\x1b[0md8888b\x1b[32m\.\x1b[0m${' '.repeat(1)}\x1b[32m\.\x1b[0md8888b\x1b[32m\.\x1b[0m${' '.repeat(4)}88${' '.repeat(1)}88d888b\x1b[32m\.\x1b[0m${' '.repeat(1)}dP${' '.repeat(4)}dP
      88${' '.repeat(5)}88${' '.repeat(1)}88\x1b[32m'\x1b[0m${' '.repeat(2)}\x1b[32m\`\x1b[0m88${' '.repeat(1)}88\x1b[32m\'\x1b[0m${' '.repeat(2)}\x1b[32m\`\x1b[0m88${' '.repeat(4)}88${' '.repeat(1)}88\x1b[32m\'\x1b[0m${' '.repeat(2)}\x1b[32m\`\x1b[0m88${' '.repeat(1)}88${' '.repeat(4)}88
      88${' '.repeat(4)}\x1b[32m\.\x1b[0m8P${' '.repeat(1)}88\x1b[32m\.\x1b[0m${' '.repeat(2)}\x1b[32m\.\x1b[0m88${' '.repeat(1)}88\x1b[32m\.\x1b[0m${' '.repeat(2)}\x1b[32m\.\x1b[0m88${' '.repeat(4)}88${' '.repeat(1)}88\x1b[32m\.\x1b[0m${' '.repeat(2)}\x1b[32m\.\x1b[0m88${' '.repeat(1)}88\x1b[32m\.\x1b[0m${' '.repeat(2)}\x1b[32m\.\x1b[0m88
      8888888P${' '.repeat(2)}\x1b[32m\`\x1b[0m88888P\x1b[32m\'\x1b[0m${' '.repeat(1)}\x1b[32m\`\x1b[0m88888P8${' '.repeat(4)}dP${' '.repeat(1)}88Y8888\x1b[32m\'\x1b[0m${' '.repeat(1)}\x1b[32m\`\x1b[0m88888P\x1b[32m\'\x1b[0m\n
      \b\b\b\b\b${' '.repeat(5)}\x1b[35m==================================================\x1b[0m`);
   console.log(`${' '.repeat(26)}\x1b[32mInstagram\x1b[0m`);
   console.log(`${' '.repeat(6)}\x1b[35m==================================================\x1b[0m`);
   rl.question(`\x1b[32mMAU BERAPA AKUN... ?\x1b[0m `, async (input) => {
      const jumlahAkun = parseInt(input, 10);
      if (isNaN(jumlahAkun) || jumlahAkun <= 0) {
         console.log('Masukkan jumlah akun yang valid.');
         rl.close();
         return;
      }
      for (let i = 0; i < jumlahAkun; i++) {
         try {
            await instagram();
         } catch {
            console.log(`\x1b[31mTerjadi Error Dan Akan Dilanjutkan ke\x1b[0m \x1b[32mProgram Selanjutnya...\x1b[0m`);
         }
      }
      rl.close();
   });
}

main().catch(console.error);
