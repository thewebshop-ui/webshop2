import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ThankYou({open}) {
    return (
        <div>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"> Danke für deine Teilnahme!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Vielen Dank, dass du dir Zeit für diese kleine Umfrage genommen hast!  
                    Dein Beitrag hilft uns, das Online-Shopping-Erlebnis noch besser zu gestalten.  

                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}
