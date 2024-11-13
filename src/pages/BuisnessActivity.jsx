import { Container, Grid, makeStyles, Paper } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import TextTruncate from "react-text-truncate";
import { Image, Tag } from "antd";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { axiosRequest } from "../http/axiosRequest";
import { getImage } from "../utils/getImage";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: 1,
  },
  media: {
    height: 100,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  paper: {
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: 768,
  },
}));
const BuisnessActivity = () => {
  const [buisnessSections, setbuisnessSections] = useState([]);
  const history = useHistory();

  const classes = useStyles();
  // axiosRequest
  const loadData = async () => {
    const { data } = await axiosRequest.get(`/buisness-section/withFiles`);
    console.log(data);

    setbuisnessSections(data);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Paper className={classes.paper}>
          <div className=" flex flex-row flex-wrap  ">
            {buisnessSections?.map((elem) => (
              <Grid item xs={12} sm={6} md={6} lg={4} >
                <Card className=" !relative mx-5" onClick={()=> history.push(`/buisness-section/${elem.id}`)}>
                  <div className=" absolute top-2 right-0">
                    {elem?.status === "soon" ? (
                      <Tag color="processing">Soon</Tag>
                    ) : (
                      <Tag color="green">Company owned project</Tag>
                    )}
                  </div>
                  <CardActionArea>
                    <div className=" flex justify-center">
                      <Image
                        preview={false}
                        className={classes.media}
                        src={getImage(elem.logo)}
                        title={elem.name}
                        height={150}
                      />
                    </div>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {elem.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        <TextTruncate
                          line={3}
                          element="span"
                          truncateText="…"
                          text={elem.description}
                        />
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </div>
        </Paper>
      </Container>
    </main>
  );
};

export default BuisnessActivity;
