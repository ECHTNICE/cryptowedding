import React from "react";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import { withRouter } from "react-router";
import EthIcon from './EthIcon';

const styles = (theme: Theme) =>
    createStyles({
        card: {
            width: '100%',
            marginBottom: '25px'
        },
        media: {
            height: 0,
            paddingTop: "56.25%" // 16:9
        },
        actions: {
            display: "flex"
        },
        expand: {
            transform: "rotate(0deg)",
            marginLeft: "auto",
            transition: theme.transitions.create("transform", {
                duration: theme.transitions.duration.shortest
            })
        },
        expandOpen: {
            transform: "rotate(180deg)"
        },
        avatar: {
            backgroundColor: red[500]
        }
    });

export interface IWeddingCardProps extends WithStyles<typeof styles> {
    weddingId: string;
    roomView: string;
}

export interface IWeddingCardState {
    expanded: boolean;
}

class WeddingCard extends React.Component<any,
    IWeddingCardState> {
    state = {expanded: false};

    handleGotoClick = () => {
        this.setState(state => ({expanded: !state.expanded}));
    };

    render() {
        const {classes} = this.props;

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <EthIcon
                            // Address to draw
                            address="0xcbBc3D3d381f3A9a48CbAE9Ca701aC3c92e0aEA5"
                            // scale * 8 pixel image size
                            scale={32}
                            // <img> props
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: 'white'
                            }}
                        />}
                    action={
                        <IconButton>
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                />
                <CardActionArea onClick={()=>{
                   console.log((this.props as any).history);
                    (this.props as any).history.push('/wedding/'+this.props.weddingId+'/'+this.props.roomView);
                }}>
                    <CardMedia
                        className={classes.media}
                        image={"assets/sample" + this.props.roomView + ".png"}
                        title="Wedding"
                    />
                    <CardContent>
                        <Typography component="p">
                            This impressive paella is a perfect party dish and a fun meal to
                            cook together with your guests. Add 1 cup of frozen peas along with
                            the mussels, if you like.
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Add to favorites">
                        <FavoriteIcon/>
                    </IconButton>


                    <a href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                       className="twitter-share-button"
                       data-text="Hi, join my crypto wedding party, with Elvis, ;-)"
                       data-url="https://cryptowedding.echtnice.com/wedding/1/01"
                       data-show-count="false" target="_blank">
                        <IconButton aria-label="Share">
                            <svg style={{width:"24px", height:"24px"}} viewBox="0 0 24 24">
                                <path fill="#000000" d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
                            </svg>
                        </IconButton>
                    </a>



                    <a href="https://twitter.com/share?ref_src=echtnice.com" className="twitter-share-button"
                       data-text="Hi, join my crypto wedding party, with Elvis. https://cryptowedding.echtnice.com/wedding/1/01"
                       data-show-count="false">Tweet</a>


                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(withRouter(WeddingCard));

