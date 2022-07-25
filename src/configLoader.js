import fs, { mkdir, readFileSync, writeFileSync } from "fs";
import os from "os";
import path from "path";

const homedir = os.homedir();

let configDirs = {
	cypherBoxDir: path.join(homedir, "/.config/cypherBox"),
	cypherBoxDirEncrypted: path.join(
		homedir,
		"/.config/cypherBox/encrypted"
	),
	cypherBoxDirDecrypted: path.join(
		homedir,
		"/.config/cypherBox/decrypted"
	),
	cypherBoxDirSigned: path.join(homedir, "/.config/cypherBox/signed"),
	accountsPath: path.join(homedir, "/.config/cypherBox/accounts.json"),
};

function initConfigs(config) {
	try {
		if (fs.existsSync(configDirs.accountsPath)) {
			let accounts = readFileSync(configDirs.accountsPath);
			config.accounts = JSON.parse(accounts);
			console.log("Accounts Loaded", config.accounts);
		} else {
			mkdir(
				configDirs.cypherBoxDir,
				{ recursive: true },
				(err) => {
					if (err) throw err;
				}
			);
			mkdir(
				configDirs.cypherBoxDirEncrypted,
				{ recursive: true },
				(err) => {
					if (err) throw err;
				}
			);
			mkdir(
				configDirs.cypherBoxDirDecrypted,
				{ recursive: true },
				(err) => {
					if (err) throw err;
				}
			);
			mkdir(
				configDirs.cypherBoxDirSigned,
				{ recursive: true },
				(err) => {
					if (err) throw err;
				}
			);
			let accounts = [{}];
			let output = JSON.stringify(accounts);
			writeFileSync(configDirs.accountsPath, output); //passing emmpty string won't work when parsing it next time
			console.log("Config files Created successfully");
		}
	} catch (err) {
		console.error("error in intializing accounts", err);
	}
}
export { initConfigs, configDirs };
