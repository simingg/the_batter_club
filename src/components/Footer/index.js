import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import InstagramIcon from "@material-ui/icons/Instagram";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "20px 10px",
    margin: "10 auto",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginBottom: 0,
    borderTop: "1px solid #000",
  },
  icon: {
    fontSize: "large",
  },
}));

const Footer = (props) => {
  const classes = useStyles();
  return (
    <div className="footer">
      <Typography className={classes.root}>
        <Link href="https://www.instagram.com/thebatterclub/">
          <InstagramIcon className={classes.icon} />
        </Link>
      </Typography>
    </div>
  );
};

export default Footer;
