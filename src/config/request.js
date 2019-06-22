import axios from "axios";
import moment from "moment";
import { config } from ".";
import { AsyncStorage } from "react-native";
import Toast from "react-native-simple-toast";
import { map, size } from "lodash";

export function PostNoToken(url, json, callback) {
  var instance = axios.create({
    headers: { "Content-Type": "application/json" },
    timeout: 20 * 1000,
    baseURL: config.domain_api
  });
  console.log("url", url);
  console.log("json", json);
  instance
    .post(url, json)
    .then(function(response) {
      callback(response.data, true);
    })
    .catch(function(error) {
      callback(error, false);
      if (error.response) {
        if (error.response.status === 500) {
          console.log(error);
        }
        if (error.response.status === 404) {
          console.log(error);
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    });
  // console.log(instance)
}

export async function PostWithToken(url, json, callback) {
  var instance = axios.create({
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: await AsyncStorage.getItem("token")
    },
    timeout: 20 * 1000,
    baseURL: config.domain_api
  });
  instance
    .post(url, json)
    .then(function(response) {
      callback(response.data, true);
    })
    .catch(function(error) {
      callback(error, false);
      if (error.response) {
        if (error.response.status === 500) {
          console.log(error);
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error);
      }
    });
}

export async function GetWithToken(url, token, callback) {
  var instance = axios.create({
    headers: { Authorization: await AsyncStorage.getItem("token") },
    timeout: 20 * 1000,
    baseURL: config.domain_api
  });
  console.log("url", url);

  instance
    .get(url)
    .then(function(response) {
      callback(response.data, true);
    })
    .catch(function(error) {
      console.log("error: " + JSON.stringify(error));
      callback(error, false);
      if (error.response) {
        console.log(error);
        if (error.response.status === 500) {
          console.log(error);
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    });
}

export function GetNoToken(link, callback) {
  var instance = axios.create({
    timeout: 20 * 1000
    // baseURL: config.domain_api
  });
  console.log("url", url);
  instance
    .get(link)
    .then(function(response) {
      callback(response.data, true);
    })
    .catch(function(error) {
      callback(error.message, false);
    });
}

export function PostWithTokenChat(url, json, token, callback) {
  var instance = axios.create({
    headers: {
      Authorization: "token=" + token,
      "Content-Type": "application/json"
    },
    timeout: 20 * 1000,
    baseURL: config.domain_api
  });
  instance
    .post(url, json)
    .then(function(response) {
      // console.log(response.data);
      callback(response.data, true);
    })
    .catch(function(error) {
      callback(error, false);
      if (error.response) {
        if (error.response.status === 500) {
          console.log(error);
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error);
      }
    });
}

// export function UploadImage(url, path, user_id, callback) {
//     console.log("path   " + path)
//     RNFetchBlob.fetch('POST', url, {
//         // 'Authorization': 'Apecsoft ' + token,
//         'Content-Type': 'multipart/form-data',
//     }, [
//             { name: 'id', data: user_id + '' },
//             { name: 'files', filename: 'IMG_' + moment(new Date()).format('YYYYMMDD_HHmmss') + '.jpg', type: 'image/jpg', data: RNFetchBlob.wrap(path) }
//         ]
//     )
//         //Với RNFetchBlob > 0.9.6
//         // listen to upload progress event, emit every 250ms  ===nghe sự kiện tải lên, phát đi mỗi 250ms
//         .uploadProgress({ interval: 250 }, (written, total) => {
//             console.log('uploaded', written / total)
//         })
//         // listen to download progress event, every 10%
//         // .progress({ count : 10 }, (received, total) => {
//         //     console.log('progress', received / total)
//         // })

//         //Với RNFetchBlob > 0.42=> 0.7.0
//         // listen to upload progress event
//         // .uploadProgress((written, total) => {
//         //     console.log('uploaded', written / total)
//         // })

//         // listen to download progress event
//         // .progress((received, total) => {
//         //     console.log('progress', received / total)
//         // })
//         .then((resp) => {
//             console.log('resp: ' + resp.data)
//             callback(JSON.parse(resp.data), true)
//         }).catch((err) => {
//             callback(err, false)
//             console.log('err: ' + err)
//         })
// };

export async function createProductFormData(
  url,
  name,
  category_id,
  count,
  price_origin,
  price_sale,
  images,
  callback,
  cb
) {
  //Upload to server
  let data = new FormData();
  // "data:image/png;base64," +
  data.append("product[name]", name);
  data.append("product[category_id]", category_id);
  data.append("count", count);
  data.append("price_origin", price_origin);
  data.append("price_sale", price_sale);

map(images,(image)=>{
  data.append(
    "images[]",
    {
      uri: image,
      type: "image/jpg",
      name: `IMG_${moment(new Date()).format("YYYYMMDD_HHmmss")}.jpg`
    },
    `IMG_${moment(new Date()).format("YYYYMMDD_HHmmss")}.jpg`
  );
})
 
  var instance = axios.create({
    timeout: 20 * 1000,
    baseURL: config.domain_api,
    headers: { 
      "content-type": "multipart/form-data",
      Authorization: await AsyncStorage.getItem("token")
    },
    onUploadProgress: function(progressEvent) {
      let t = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
      cb(t);
    }
  });

  // instance.post(url, data).then(function(response) {
  //   callback(response.data, true);
  // });
  instance
    .post(url, data)
    .then(function(response) {
      callback(response.data, true);
    })
    .catch(function(error) {
      callback(error, false);
      if (error.response) {
        if (error.response.status === 500) {
          console.log(error);
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error);
      }
    });
}

export function UploadImageAxios(url, dataURI, token, callback, cb) {
  //Upload to server
  let data = new FormData();
  // "data:image/png;base64," +
  data.append(
    "files",
    {
      uri: dataURI,
      type: "image/jpg",
      name: `IMG_${moment(new Date()).format("YYYYMMDD_HHmmss")}.jpg`
    },
    `IMG_${moment(new Date()).format("YYYYMMDD_HHmmss")}.jpg`
  );
  var instance = axios.create({
    timeout: 20 * 1000,
    baseURL: config.domain_api,
    headers: { "content-type": "multipart/form-data", "x-access-token": token },
    onUploadProgress: function(progressEvent) {
      let t = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
      cb(t);
    }
  });

  instance.post(url, data).then(function(response) {
    callback(response.data);
  });
}

// export function UploadImageWithToken(url, path, token, callback) {
//     RNFetchBlob.fetch('POST', url, {
//         'Authorization': 'Apecsoft ' + token,
//         'Content-Type': 'multipart/form-data',
//     }, [{ name: 'photo', filename: 'IMG_' + moment(new Date()).format('YYYYMMDD_HHmmss') + '.jpg', type: 'image/jpg', data: RNFetchBlob.wrap(path) },]
//     )

//         //Với RNFetchBlob > 0.9.6
//         // listen to upload progress event, emit every 250ms  ===nghe sự kiện tải lên, phát đi mỗi 250ms
//         // .uploadProgress({ interval: 250 }, (written, total) => {
//         //     console.log('written: ' + written)
//         //     console.log('total: ' + total)
//         //     console.log('uploaded: ', written / total)
//         // })
//         //listen to download progress event, every 10%
//         .progress({ count: 10 }, (received, total) => {
//             console.log('writtendownload: ' + received)
//             console.log('totaldownload: ' + total)
//             console.log('progress', received / total)
//         })

//         //Với RNFetchBlob > 0.42=> 0.7.0
//         // listen to upload progress event
//         .uploadProgress((written, total) => {
//             console.log('written: ' + written)
//             console.log('total: ' + total)
//             console.log('uploaded', written / total)
//         })

//         // listen to download progress event
//         // .progress((received, total) => {
//         //     console.log('progress', received / total)
//         // })
//         .then((resp) => {
//             console.log('resp: ' + JSON.stringify(resp))
//             callback(JSON.parse(resp.data), true)
//         }).catch((err) => {
//             callback(err, false)
//             console.log('err: ' + err)
//         })
// }
