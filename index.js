const request = require('request');

// reference Fields： https://github.com/dooboolab-community/react-native-iap/blob/2a980709054a32fc2af4e389300a482cb098f83e/src/types/index.ts#L66
const receiptData = '';

// password from https://appstoreconnect.apple.com/access/shared-secret
const password = ''
const options = {
  uri: 'https://sandbox.itunes.apple.com/verifyReceipt', // or use 'https://buy.itunes.apple.com/verifyReceipt' for production
  method: 'POST',
  json: { 'receipt-data': receiptData, password }
};

request(options, (error, response, body) => {
  if (!error && response.statusCode == 200) {
    const jsonResponse = body;
    // Analyze purchase information
    const purchases = jsonResponse.receipt.in_app;
    for (const purchase of purchases) {
      const productID = purchase.product_id;
      const transactionID = purchase.transaction_id;``
      const purchaseDate = new Date(purchase.purchase_date_ms);
      console.log(`Product ID: ${productID}`);
      console.log(`Transaction ID: ${transactionID}`);
      console.log(`Purchase Date: ${purchaseDate}`);
    }

    console.log('all info:', jsonResponse)
  } else {
    console.log('Error validating receipt:', error);
  }
});
