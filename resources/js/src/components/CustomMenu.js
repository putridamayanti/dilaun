import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {IconButton} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";

export default function CustomMenu(props) {
    const { children } = props
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    const handleMenu = (e) => {
        setOpen(!open)
        setAnchorEl(anchorEl === null ? e.currentTarget : null)
    }

    return (
        <Box>
            <IconButton onClick={(e) => handleMenu(e)}>
                <MoreVertIcon/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={(e) => handleMenu(e)}
            >
                {children}
            </Menu>
        </Box>
    )
}
