const getProvider = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if ((<any>window).ethereum) {
        try {
          // Request account access if needed
          await (<any>window).ethereum.enable();
          // Acccounts now exposed
          resolve((<any>window).ethereum);
        } catch (error) {
          reject(error);
        }
      } else {
        reject("window.ethereum not found");
      }
    });
  });

export default getProvider;
