import React from 'react';
import {Box, Avatar, Typography, IconButton, Tooltip} from "@material-ui/core";
import {MdDeleteForever} from "react-icons/md";
import {RiEdit2Fill} from "react-icons/ri";
import {IEducationalStaff} from "../../interfaces/educationalStaff";
import {educationalStaffContext, educationalStaffDialogsContext} from "../../store/store";
import {observer} from "mobx-react-lite";
import {useStyles} from "../../assets/styles/admin/ClubMemberItemStyles";

const EducationalStaffItemCard: React.FC<IEducationalStaff> = observer(({first_name, last_name, image, facebook, id}: IEducationalStaff) => {
    const classes = useStyles();
    const educationalStaff = React.useContext(educationalStaffContext);
    const educationalStaffDialogs = React.useContext(educationalStaffDialogsContext);

    return (
        <div className={classes.root}>
            <Box className={classes.BoxFlex}>
                <Box className={classes.BoxFlexCenter}>
                    <Avatar src={`http://localhost:4000/uploads/${image.trim()}`} alt={`${first_name} ${last_name}`} className={classes.avatar}/>
                    <Typography variant="h6">{first_name} {last_name}</Typography>
                </Box>
                <Box className={classes.BoxFlexCenter}>
                    <Tooltip title="حذف">
                        <IconButton onClick={() => {
                            educationalStaff.educationalStaffSelected = id;
                            educationalStaffDialogs.openDeleteDialog()
                            }}>
                            <MdDeleteForever />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='تعديل'>
                        <IconButton onClick={() => {
                            educationalStaff.educationalStaffSelected = id;
                            educationalStaffDialogs.openEditDialog();
                        }}>
                            <RiEdit2Fill />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

        </div>
        
    )
})

export default EducationalStaffItemCard
