import { Container, Dialog, makeStyles, Paper, Slide } from "@material-ui/core";
import { useCallback } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./pdf.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Button, Image, List, Tag } from "antd";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { axiosRequest } from "../http/axiosRequest";
import { getImage } from "../utils/getImage";
import CloseIcon from "@material-ui/icons/Close";

import { useHistory, useParams } from "react-router-dom";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const resizeObserverOptions = {};

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
const BuisnessSectionDetails = () => {
  const [buisnessSection, setbuisnessSection] = useState([]);
  const history = useHistory();
  const { id } = useParams();
  console.log(id);

  const classes = useStyles();
  // axiosRequest
  const loadData = async () => {
    const { data } = await axiosRequest.get(
      `/buisness-section/withFiles/${id}`
    );

    setbuisnessSection(data);
  };
  useEffect(() => {
    loadData();
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [file, setFile] = useState("");
  const [numPages, setNumPages] = useState();
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState();

  const onResize = useCallback((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);
  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onFileChange(event) {
    const { files } = event.target;

    const nextFile = files?.[0];

    if (nextFile) {
      setFile(nextFile);
    }
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
    setPageNumber(1); // Reset to first page on load
  }
  const [pageNumber, setPageNumber] = useState(1);

  const goToNextPage = () =>
    setPageNumber((prevPage) => Math.min(prevPage + 1, numPages));
  const goToPreviousPage = () =>
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Paper className={classes.paper}>
          <div className=" flex flex-row flex-wrap  ">
            {buisnessSection && (
              <Card className=" !relative">
                <div className=" absolute top-2 right-0">
                  {buisnessSection?.status === "soon" ? (
                    <Tag color="processing">Soon</Tag>
                  ) : (
                    <Tag color="green">Company owned project</Tag>
                  )}
                </div>
                <>
                  <div className=" flex mx-3 my-3">
                    <Image
                      preview={false}
                      className={classes.media}
                      src={getImage(buisnessSection.logo)}
                      title={buisnessSection.name}
                      height={150}
                    />
                  </div>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {buisnessSection.name}
                    </Typography>
                    <Button
                      className=" my-2"
                      onClick={() => window.open(buisnessSection.websiteUrl)}
                    >
                      View
                    </Button>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {buisnessSection.description}
                    </Typography>
                    <List
                      className=" my-5"
                      size="small"
                      header={
                        <Typography variant="h6" color="primary" component="p">
                          Relevant Documents:
                        </Typography>
                      }
                      bordered
                      dataSource={buisnessSection.relevantDocuments}
                      renderItem={(item) => (
                        <List.Item>
                          <span
                            onClick={() => {
                              setFile(getImage(item));
                              showModal();
                            }}
                            className=" text-primary cursor-pointer"
                          >
                            {item}
                          </span>
                        </List.Item>
                      )}
                    />
                  </CardContent>
                </>
              </Card>
            )}
          </div>
        </Paper>
      </Container>

      <Dialog
        open={isModalOpen}
        onClose={handleCancel}
        TransitionComponent={Transition}
      >
        <div className=" flex flex-col">
          <div className=" flex justify-end mx-3 my-2">
            <Button onClick={handleCancel}>
              <CloseIcon />
            </Button>
          </div>

          <div className=" flex   m-5 justify-center flex-col align-middle items-center align-items-center">
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
          </div>
          <div className="relative w-full flex justify-center mb-5">
            <div className=" shadow-2xl border  z-50 bottom-0 bg-white cursor-pointer ">
              <div className=" flex flex-row justify-between space-x-5 mx-3 items-center py-2">
                <button
                  onClick={goToPreviousPage}
                  disabled={pageNumber <= 1}
                  className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                <p className="text-gray-700 font-medium">
                  Page {pageNumber} of {numPages}
                </p>

                <button
                  onClick={goToNextPage}
                  disabled={pageNumber >= numPages}
                  className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </main>
  );
};

export default BuisnessSectionDetails;
