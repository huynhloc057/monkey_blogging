import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { postStatus } from "../../../utils/constants";
import { Button } from "../../button";
import Radio from "../../checkbox/Radio";
import { Dropdown } from "../../dropdown";
import { Field } from "../../field";
import ImageUpload from "../../image/ImageUpload";
import { Input } from "../../input";
import { Label } from "../../label";
import Toggle from "../../toggle/Toggle";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useSearchParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import useFirebaseImage from "../../../hooks/useFirebaseImage";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import ImageUploader from "quill-image-uploader";
import ReactQuill, { Quill } from "react-quill";
import { useMemo } from "react";
import axios from "axios";

Quill.register("modules/imageUploader", ImageUploader);

const PostUpdate = () => {
  const [params] = useSearchParams();
  const postId = params.get("id");
  const [categories, setCategories] = useState([]);
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { isSubmitting, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: "",
  });
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const imageURL = getValues("image");
  const imageName = getValues("imageName");

  useEffect(() => {
    async function fetchData() {
      if (!postId) return;
      const docRef = doc(db, "posts", postId);
      const docSnapshot = await getDoc(docRef);
      console.log("data", docSnapshot.data());
      if (docSnapshot.data()) {
        reset(docSnapshot.data());
        setSelectCategory(docSnapshot.data()?.category || "");
        setContent(docSnapshot.data()?.content || "");
      }
    }
    fetchData();
  }, [postId, reset]);

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
      // console.log("result", result);
    }
    getData();
  }, []);

  async function deletePostImage() {
    const colRef = doc(db, "posts", postId);
    await updateDoc(colRef, {
      avatar: "",
    });
  }
  const { image, progress, handleSelectImage, handleDeleteImage, setImage } =
    useFirebaseImage(setValue, getValues, imageName, deletePostImage);

  useEffect(() => {
    setImage(imageURL);
  }, [imageURL, setImage]);

  const [selectCategory, setSelectCategory] = useState("");

  const handleClickOption = async (item) => {
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setValue("categoryId", item.id);
    setSelectCategory(item);
  };

  const [content, setContent] = useState("");

  const updatePostHandler = async (values) => {
    if (!isValid) return;
    // console.log("values", values);
    const docRef = doc(db, "posts", postId);
    await updateDoc(docRef, {
      ...values,
      content,
    });
    toast.success("Update content successfully");
  };

  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        //imgbbAPI
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "post",
            url: "https://api.imgbb.com/1/upload?key=d968b3fc94e252ff61fcd155d60488ec",
            data: bodyFormData,
            headers: {
              "Content-type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );
  if (!postId) return null;
  return (
    <div className="p-5">
      <DashboardHeading
        title="Update posts"
        desc="Update post content"
      ></DashboardHeading>

      <form onSubmit={handleSubmit(updatePostHandler)}>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
              progress={progress}
              image={image}
            ></ImageUpload>
          </Field>

          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Select the category"></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleClickOption(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {selectCategory?.name && (
              <span className="inline-block p-4 text-sm font-medium text-green-600 bg-green-100 rounded-lg">
                {selectCategory?.name}
              </span>
            )}
          </Field>
        </div>
        <div className="mb-10">
          <Field>
            <Label>Content</Label>
            <div className="w-full entry-content">
              <ReactQuill
                modules={modules}
                theme="snow"
                value={content}
                onChange={setContent}
              />
            </div>
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Feature post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                onClick={() => setValue("status", 1)}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                onClick={() => setValue("status", 2)}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                onClick={() => setValue("status", 3)}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </div>
          </Field>
        </div>
        <Button
          type="submit"
          className="mx-auto w-[250px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update post
        </Button>
      </form>
    </div>
  );
};

export default PostUpdate;
