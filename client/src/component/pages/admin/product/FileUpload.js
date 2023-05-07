import React from "react";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
import axios from "axios";
import { Avatar, Badge, Spin } from "antd";

const FileUpload = ({ values, setValues, loading, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));
  //   console.log("value in file upload", values);

  const handleRemove = (public_id) => {
    setLoading(true);
    // const img = values.images
    const { images } = values;
    // ไปดูจากไฟล์ server controller ไฟล์ cloudinary.js
    axios
      .post(
        process.env.REACT_APP_API + "/removeimages",
        { public_id },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        let filterImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        // console.log(filterImages);
        // เปลี่ยนค่า images ให้เป็นค่า filterImages
        setValues({ ...values, images: filterImages });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChangeFile = (e) => {
    const files = e.target.files;
    if (files) {
      setLoading(true);

      let allfileUpload = values.images;
      for (let i = 0; i < files.length; i++) {
        // console.log(files[i]);
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                process.env.REACT_APP_API + "/images",
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user.token,
                  },
                }
              )
              .then((res) => {
                setLoading(false);
                console.log(res);
                allfileUpload.push(res.data);
                console.log("allfile", allfileUpload);
                //จะเก็บไว้ค่าที่ images ที่ประกาศมาจากหน้า createproduct.js
                setValues({ ...values, images: allfileUpload });
              })
              .catch((err) => {
                console.log(err);
              });
            console.log(uri);
          },
          "base64"
        );
      }
    }
  };

  return (
    <>
      <br />
      {values.images &&
        values.images.map((item) => (
          <span className="avatar-item">
            <Badge
              count="X"
              style={{ cursor: "pointer" }}
              onClick={() => handleRemove(item.public_id)}
            >
              <Avatar
                className="m-3"
                src={item.url}
                shape="square"
                size={120}
              />
            </Badge>
          </span>
        ))}
      <br />
      <hr />

      <div className="form-group">
        <label className="btn btn-primary">
          Choose File..
          <input
            onChange={handleChangeFile}
            className="form-control"
            type="file"
            name="file"
            multiple
            hidden
            accept="images/*"
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
