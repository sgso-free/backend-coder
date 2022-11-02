const config = {
    fileSystem: {
        path: './DB'
    },
    mongoDB: {
      dbURI: 'mongodb://localhost:27017/ecommerce'
    },
    firebase: {
      firebaseConfig :  {
          "type": "service_account",
          "project_id": "coder-backend-7aec5",
          "private_key_id": "3a17c2bacfb9581c0304f0c0dcf3081a1be64f69",
          "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDVHzHP2c87a0ib\nft1LAp5B7CYl1eT5+aH0J8xuJCMzRtgWFkKhYIATqnYfbLzP3Id7TVTYoSNhZ7BQ\nQlAYE1u8yPDTJAlmbNt8xijD+D73UA2TJ0g4CucL+cHk/effxPyHS4vFkzD1yKzR\n92xwXIUXiT8Hs/9xzzBeLcql//t8Mw8mFwqyuAlAIcgMOEmmc2T03fqScGKRPYfS\nhS7LMRaJCsoAl1OAWrgWtx3VXtaW+QoVWOQavXhM4QXa0NTiNljVCI/5T9KIJoCq\nTpWB/0pCyEo7IHvLa++yn06i91SUlFFDEfw6aSevp+mjHlROzApTk4AzRtPGKUwi\nEIGB0ETvAgMBAAECggEAMhdUYll7uygCl0WQpp41ayIhbzggSt6xAY1PH74PpfAr\nPrm5rGtdfwHMJKOulx5qm4D4BbiN88lmp96GK7p1D+CctcudB/1i8ycyEqlox0EC\nB8muUDnDx01LFNLWqoIGppgLgIMReVtSv0DrtFcSkw8XiOx2CB5d7GzP2gdZ6P07\nYyujLWTOHKgEqGCp/3wcy1dgouIMjVoLYKLNUfz+7453TK8DYjZORSGpXRTzShDS\nnwDhhIg9JSk6/ZPDMerxRRCfjCCRIOKF23vRjsUuZXf8Plaaew4keEcEXBznTSGO\nJceWuH2/T7QDIVCKFFjZrijCvDhn1H9viFsMAGB7EQKBgQDwtu9yU5SN3sihjKX8\n2pQz3BOjzwG3vlHjyaR4TFeMXSb7yfycvxJMclaPeJjlMka4fEJPxnXUIpWwit48\nDPemmTDLbgAWPrM7QyZBllHNeGCxL3eQk3vY4YnPytQNCTj/sihrUwezQHxn5lgF\ndjSF8DBjsKbjjBWoun3N/crYkQKBgQDip7Xz8fK4TvCbnk3YjnGn2lsjNqDChEzD\nCzn6O293ZhOjnWIQmunUkAtSk+DrL4dSG5f0TxC6J5Q7i/tTefWgAp+TNGn7Xg5a\nVdIDY40G0F1hrib3AenuX9A0wqCvIBzh6PemsNgQWhMFRI3PuYGNy3XG5QsvDxGv\nW4fkfrQFfwKBgEZKFNd8gnd+43UQ/fM83GPcUrvVmbnO0FjEq8sY98Ob++MwUxxu\nSuiZxp70ZykeKjp6xl5HJGcChlVb55L/cl1qhC4S++GDA5E9hXFHdLGcAhgbNT25\nY0OscDKGFq+LzuITYuwb/bahEPLB91f48VNfFLI3hjQR1s1DT7MT9eSRAoGAM/9b\nu9JG58ecZWck3siXBHYQsHxo1xc48QoTS/f0s4SkfsWtaLfRayV8o34vfGUT+18/\nNhopcTuBQ0Py7YyuL/5KE6BTrApA6rKDkql1AhotQiqM39/9heVPQ7te165bUex7\nXC938hBoCq5WhlA9i4UgyPdk4G/pk7xA6cezjwsCgYEArOy6H5LYqTU2MI3a+qte\n/jZz9IKCxMBxITwd/tlSIBDvVKQQhwRD+QdzL6isC6GrM4EJwgWwW93uIZTIVcu4\n+0eImcxQcBpDFpgSxfZdB08X/SjR4B/PXLDrr9Rqiobi91gN5//ECiKZavRVHuIT\nnUaHjDwNrWgWkMd1MUuj+Zo=\n-----END PRIVATE KEY-----\n",
          "client_email": "firebase-adminsdk-s73ie@coder-backend-7aec5.iam.gserviceaccount.com",
          "client_id": "117207029853794011924",
          "auth_uri": "https://accounts.google.com/o/oauth2/auth",
          "token_uri": "https://oauth2.googleapis.com/token",
          "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
          "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-s73ie%40coder-backend-7aec5.iam.gserviceaccount.com"
      }
    }
  };

module.exports = config;