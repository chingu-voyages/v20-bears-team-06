import { Form, Field, Formik } from 'formik';
import React, {useState} from 'react';
import { useMutation } from "@apollo/react-hooks";
import { formatFileName, uploadToS3 } from "../components/UploadExample";
import { TextInputField } from "./fields/TextInputField";
import * as Yup from "yup";
import { DropZoneField } from "./mui_components/DropzoneArea";
import { uploadToS3 } from '../../utils/uploadToS3';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
      '& input' : {
        fontSize: theme.typography.subtitle2
      }
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const fileTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-powerpoint',
    'video/vnd.uvvu.mp4',
    'application/vnd.oasis.opendocument.text',
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
    'audio/mp4',
    'audio/mpeg',
    'image/*',
    'text/*',
  ];


  const FileUploadForm = ({meId}) => {
      const classes = useStyles();
      const [newUpload] = useMutation(NEW_UPLOAD_MUTATION,{
        refetchQueries: {
          query: GET_FILES,
          variables: {userId: meId}
        }
      });


      return(
          <Formik 
            initialValues={{
                fileName: '',
                category: '',
                gradeLevel: '',
                file: []
            }}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={Yup.object({
                fileName: Yup.string().min(1).max(30).nullable(),
                category: Yup.string().min(2).max(40).nullable(),
                gradeLevel: Yup.nullable()
            })}
            onSubmit={(values, {setSubmitting, setFieldError}) => {
                let type, name;
                if (values.file[0]) {
                    let file = values.file[0].file;
                    type = file.type;
                    name = file.name;
                  }
                  setTimeout(async () => {
                    try {
                      const response = await edit({
                        variables: {
                          userId: meId,
                          school: values.school ? values.school : profile.school,
                          department: values.department
                            ? values.department
                            : profile.department,
                          position: values.position
                            ? values.position
                            : profile.position,
                          about_me: values.aboutMe
                            ? values.aboutMe
                            : profile.about_me,
                          location: values.location
                            ? values.location
                            : profile.location,
                          filetype: type ? type : null,
                          filename: name ? formatFileName(name) : null,
                          firstName: values.firstName?
                          values.firstName: profile.lastName,
                          lastName: values.lastName? values.lastName: profile.lastName,
                        },
                      });
                      if (response && response.data && !response.data.editUser) {
                        setFieldError("invalid field data");
                        return;
                      }
                      if (response && response.data && response.data.editUser.s3) {
                        const s3 = response.data.editUser.s3;
                        const s3response = await uploadToS3(
                          values.file[0].file,
                          s3.signedRequest
                        );
                      }
                    } catch (e) {
                      console.log("error with edit", e);
                    }
    
                    setSubmitting(false);
                  }, 400);
                }}
            }}
            >
      )

  }