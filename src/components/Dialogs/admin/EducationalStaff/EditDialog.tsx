import React from 'react'
import {Dialog , DialogActions , DialogContent, DialogTitle, Button, Box, IconButton, Avatar, CircularProgress } from "@material-ui/core";
import { TransitionDialog } from '../../../transitionDialog';
import {Formik, Form} from "formik";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CustomField from "../../../CustomeField";
import {EducationalStaffSchema} from "../../../../validations/educationalStaff";
import {educationalStaffContext, educationalStaffDialogsContext} from "../../../../store/store";
import {observer} from "mobx-react-lite";

const EditDialog = observer(() => {
    const educationalStaff = React.useContext(educationalStaffContext);
    const educationalStaffDialogs = React.useContext(educationalStaffDialogsContext);
    const [image, setImage] = React.useState('');
    const educationalStaffItem = educationalStaff.educationalStaff.find(item => item.id === educationalStaff.educationalStaffSelected);

     let initialValues = {
        first_name: `${educationalStaffItem?.first_name}`,
        last_name: `${educationalStaffItem?.last_name}`,
        facebook: `${educationalStaffItem?.facebook}`,
        image: `http://localhost:4000/uploads/${educationalStaffItem?.image.trim()}`
    }

    const handleClose = () => {
        educationalStaffDialogs.closeEditDialog()
    };

    return (
        <Dialog
        open={educationalStaffDialogs.isEditDialogOpen}
        TransitionComponent={TransitionDialog}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">تعديل عضو الهيئة التدريسية</DialogTitle>
            <Formik
              initialValues={initialValues}
              validationSchema={EducationalStaffSchema}
              onSubmit={async (values, {setSubmitting}) => {
                setSubmitting(true);
                let data = new FormData();
                data.append('image', values.image);
                data.append('first_name', values.first_name);
                data.append('last_name', values.last_name);
                data.append('facebook', values.facebook);
                await educationalStaff.updateEducationalStaff(data);
                educationalStaffDialogs.isOpen = true;
                handleClose(); 
                }}
            >
                {(formProps) =>(
                      
                    <Form>
                        <DialogContent>
                            <Box style={{position: 'relative', width: 'fit-content', margin: '0 auto'}}>
                                <Avatar src={image === ''? initialValues.image : image} style={{width: '200px', height: '200px', position: 'relative'}}/>
                                <Box style={{position: 'absolute', bottom: 0, left: 0}}>
                                    <input 
                                    accept="image/*"
                                    style={{display: 'none'}}
                                    id="icon-button-file"
                                    type="file"
                                    name="image"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            const value = e.target.files[0]
                                            setImage(URL.createObjectURL(value));
                                            formProps.setFieldValue('image', e.target.files[0]);
                                        }
                                    }} />
                                    <label htmlFor="icon-button-file">
                                        <IconButton color="primary" style={{background: '#eee'}} aria-label="upload picture" component="span">
                                        <PhotoCamera style={{color: '#aaa'}}/>
                                        </IconButton>
                                    </label>
                                </Box>
                            </Box>
                            <CustomField placeholder="الاسم الأول" name="first_name" type="text" label="الاسم الأول" />
                            <CustomField placeholder="الاسم الأخير" name="last_name" type="text" label="الاسم الأخير" />
                            <CustomField placeholder="رابط حساب الفيسبوك" name="facebook" type="text" label="رابط حساب الفيسبوك" />
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={handleClose}>
                                الغاء
                            </Button>
                            <Button color="primary" type="submit">
                                {
                                    educationalStaff.isLoading? <CircularProgress size={20}/> : 'حفظ'
                                } 
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
      </Dialog>
    )
})

export default EditDialog
