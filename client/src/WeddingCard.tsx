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
                    title="0xcbBc3D3d381f3A9a48CbAE9Ca701aC3c92e0aEA5"
                    subheader="March 10, 2019"
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
                            Hi, join my crypto wedding party!
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Add to favorites" style={{color:"rgb(234, 57, 98)"}}
                                onClick={()=>{
                                    console.log((this.props as any).history);
                                    (this.props as any).history.push('/wedding/'+this.props.weddingId+'/'+this.props.roomView);
                                }}
                    >
                        <FavoriteIcon/> <span style={{fontSize:"14px"}}>20</span>
                    </IconButton>


                    <a href="https://twitter.com/intent/tweet?text=Hi,%20join%20my%20crypto%20%20wedding%20%20party!%20%20https://cryptowedding.echtnice.com/wedding/0/01"
                    target="_blank" style={{color:"#444444"}}>
                        <ShareIcon/>
                    </a>



                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(withRouter(WeddingCard));

