import React from 'react'
import {Dialog , DialogActions , DialogContent, DialogTitle, Button, Box, IconButton, Avatar, CircularProgress } from "@material-ui/core";
import { TransitionDialog } from '../../../transitionDialog';
import DrpoDownProps from "../../../DropDownList";
import {Formik, Form} from "formik";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CustomField from "../../../CustomeField";
import {ClubMemberSchema} from "../../../../validations/clubMembers";
import {clubMembersContext, clubMembersDialogsContext} from "../../../../store/store";
import {observer} from "mobx-react-lite";

let rankList = [
    {key: 'مسؤول', value: 'مسؤول'},
    {key: 'مشارك', value: 'مشارك'},
    {key: 'مساعد', value: 'مساعد'}
];

let initialValues = {
    first_name: '',
    last_name: '',
    rank: '',
    image: ''
}

const ClubMemberAddDialog = observer(() => {
    const clubMembers = React.useContext(clubMembersContext);
    const clubMembersDialogs = React.useContext(clubMembersDialogsContext);
    const [image, setImage] = React.useState('');

    const handleClose = () => {
        clubMembersDialogs.closeAddDialog()
    };
    return (
        <Dialog
        open={clubMembersDialogs.isAddDialogOpen}
        TransitionComponent={TransitionDialog}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
          <DialogTitle id="alert-dialog-slide-title">اضافة عضو للنادي</DialogTitle>
              <Formik
              initialValues={initialValues}
              validationSchema={ClubMemberSchema}
              onSubmit={async (values, {setSubmitting}) => {
                setSubmitting(true);
                let data = new FormData();
                data.append('image', values.image);
                data.append('first_name', values.first_name);
                data.append('last_name', values.last_name);
                data.append('rank', values.rank);
                await clubMembers.createAdminClubMembers(data);
                clubMembersDialogs.isOpen = true;
                handleClose();
                }}
              >
                {(formProps) =>(
                    <Form>
                        <DialogContent>
                            <Box style={{position: 'relative', width: 'fit-content', margin: '0 auto'}}>
                                <Avatar src={image} style={{width: '200px', height: '200px', position: 'relative'}}/>
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
                            <DrpoDownProps label="الرتبة" options={rankList} name="rank" />
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={handleClose}>
                                الغاء
                            </Button>
                            <Button color="primary" type="submit">
                                {
                                    clubMembers.isLoading? <CircularProgress size={20}/> : 'اضافة'
                                } 
                            </Button>
                        </DialogActions>
                    </Form>
                )}
              </Formik>
      </Dialog>
    )
})

export default ClubMemberAddDialog
