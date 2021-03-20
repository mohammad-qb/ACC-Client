import React from 'react'
import {Dialog , DialogActions , DialogContent, DialogTitle, Button, Typography } from "@material-ui/core";
import {educationalStaffContext} from "../../../../store/store";
import { TransitionDialog } from '../../../transitionDialog';

const DeleteDialog = () => {
    const educationalStaff = React.useContext(educationalStaffContext);

    const handleClose = () => {
        educationalStaff.closeDeleteDialog()
    };

    return (
        <Dialog
        open={educationalStaff.isDeleteDialogOpen}
        TransitionComponent={TransitionDialog}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
          <DialogTitle id="alert-dialog-slide-title">تأكيد الحذف</DialogTitle>
          <DialogContent>
             <form>
                 <Typography>هل انت متأكد من انك تريد الحذف؟</Typography>
             </form>
          </DialogContent>
          <DialogActions>
            <Button color="primary">
                الغاء
            </Button>
            <Button color="primary">
                حذف
            </Button>
          </DialogActions>
      </Dialog>
    )
}

export default DeleteDialog
