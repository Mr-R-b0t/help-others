
const account = new Account(appwrite);

  const [image, setImage] = useState(null);
  const [succ, setSucc] = useState(false);

    const promise = account.get();
    promise.then(
      function (response) {
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );

  function sendXmlHttpRequest(data) {
    const xhr = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = (e) => {
        if (xhr.readyState !== 4) {
          return;
        }
        console.log("xhr.status", xhr);

        if (xhr.status === 201) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject("Request Failed");
        }
      };

      xhr.open("POST", `${API_URL}/v1/storage/buckets/${BUCKET_ID}/files/`);
      xhr.withCredentials = true;
      // xhr.setRequestHeader("content-type", "multipart/form-data");
      xhr.setRequestHeader("X-Appwrite-Project", PROJECT_ID);
      xhr.setRequestHeader("X-Appwrite-Response-Format", "0.15.0");
      xhr.setRequestHeader("x-sdk-version", "appwrite:web:9.0.1");
      xhr.send(data);
    });
  }

  const uploadImage = async () => {
    let filename = (await account.get()).$id.split("/").pop();
    console.log("filename", filename);

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(image);
    let type = match ? `image/${match[1]}` : `image`;
    let formData = new FormData();
    formData.append("fileId", "unique()");
    formData.append("file", {
      uri: image,
      name: filename,
      type,
    });
    formData.append("read", "");
    formData.append("write", "");

    console.log("formData", formData);
    await sendXmlHttpRequest(formData).then(
      function (response) {
        console.log("response", response); // Success
        account.updatePrefs({ avatar: response.$id });
        setSucc(true);
      },
      function (error) {
        console.log("error", error); // Failure
      }
    );
  };
