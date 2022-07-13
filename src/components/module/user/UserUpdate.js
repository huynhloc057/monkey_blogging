import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/firebase-config";
import useFirebaseImage from "../../../hooks/useFirebaseImage";
import { userRole, userStatus } from "../../../utils/constants";
import { Button } from "../../button";
import Radio from "../../checkbox/Radio";
import { Field } from "../../field";
import FieldCheckboxes from "../../field/FieldCheckboxes";
import ImageUpload from "../../image/ImageUpload";
import { Input } from "../../input";
import { Label } from "../../label";
import { Textarea } from "../../textarea";
import DashboardHeading from "../dashboard/DashboardHeading";

const UserUpdate = () => {
  const {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { isSubmitting, isValid },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const handleUpdateUser = async (values) => {
    if (!isValid) return;
    try {
      const colRef = doc(db, "users", userId);
      await updateDoc(colRef, {
        ...values,
        avatar: image,
      });
      toast.success("Update user successfully");
    } catch (error) {
      console.log("Error in Update", error);
      toast.error("Update user failed!");
    }
  };
  const imageURL = getValues("avatar");
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const [params] = useSearchParams();
  const userId = params.get("id");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageURL);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  useEffect(() => {
    if (!userId) return;
    async function fetchData() {
      const colRef = doc(db, "users", userId);
      const docData = await getDoc(colRef);
      reset(docData && docData.data());
      console.log(docData.data());
    }
    fetchData();
  }, [userId, reset]);
  async function deleteAvartar() {
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, {
      avatar: "",
    });
  }
  const {
    image,
    progress,
    handleSelectImage,
    handleDeleteImage,
    handleResetUpload,
    setImage,
  } = useFirebaseImage(setValue, getValues, imageName, deleteAvartar);
  useEffect(() => {
    setImage(imageURL);
  }, [imageURL, setImage]);

  if (!userId) return null;

  return (
    <div>
      <div className="p-8">
        <DashboardHeading
          title="Update user"
          desc="Update user information"
        ></DashboardHeading>
        <form onSubmit={handleSubmit(handleUpdateUser)}>
          <div className="w-[200px] h-[200px] rounded-full mx-auto mb-10">
            <ImageUpload
              className="!rounded-full object-cover h-full"
              image={image}
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
              progress={progress}
            ></ImageUpload>
          </div>

          <div className="form-layout">
            <Field>
              <Label>Fullname</Label>
              <Input
                name="fullname"
                placeholder="Enter your fullname"
                control={control}
              ></Input>
            </Field>
            <Field>
              <Label>Username</Label>
              <Input
                name="username"
                placeholder="Enter your username"
                control={control}
              ></Input>
            </Field>
          </div>
          <div className="form-layout">
            <Field>
              <Label>Email</Label>
              <Input
                name="email"
                placeholder="Enter your email"
                control={control}
                type="email"
              ></Input>
            </Field>
            <Field>
              <Label>Password</Label>
              <Input
                name="password"
                placeholder="Enter your password"
                control={control}
                type="password"
              ></Input>
            </Field>
          </div>
          <div className="form-layout">
            <Field>
              <Label>Status</Label>
              <FieldCheckboxes>
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === userStatus.ACTIVE}
                  value={userStatus.ACTIVE}
                >
                  Active
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === userStatus.PENDING}
                  value={userStatus.PENDING}
                >
                  Pending
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === userStatus.BAN}
                  value={userStatus.BAN}
                >
                  Banned
                </Radio>
              </FieldCheckboxes>
            </Field>
            <Field>
              <Label>Role</Label>
              <FieldCheckboxes>
                <Radio
                  name="role"
                  control={control}
                  checked={Number(watchRole) === userRole.ADMIN}
                  value={userRole.ADMIN}
                >
                  Admin
                </Radio>
                <Radio
                  name="role"
                  control={control}
                  checked={Number(watchRole) === userRole.MOD}
                  value={userRole.MOD}
                >
                  Moderator
                </Radio>
                <Radio
                  name="role"
                  control={control}
                  checked={Number(watchRole) === userRole.USER}
                  value={userRole.USER}
                >
                  User
                </Radio>
              </FieldCheckboxes>
            </Field>
          </div>
          <div className="form-layout">
            <Field>
              <Label>Description</Label>
              <Textarea name="description" control={control}></Textarea>
            </Field>
          </div>
          <Button
            kind="primary"
            className="mx-auto w-[200px]"
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserUpdate;
