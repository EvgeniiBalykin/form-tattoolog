import React, { useEffect, useState } from "react";
// import * as yup from "yup";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Stack,
  Button,
  Spinner,
} from "react-bootstrap";
import { XCircle, CheckCircle } from "react-bootstrap-icons";
import { Formik } from "formik";
import { Result } from "../../components/Result";
import { useTranslation } from "react-i18next";
import "yup-phone-lite";
import { getAPIAddrPL } from "../../helpers/url";
// import { useParams } from "react-router-dom";
import { toBase64 } from "../../helpers/toBase64";

const COUNTRIES = "https://tattoolog.de/tools/countries/?page_size=400";
const CITIES = (country) =>
  `https://tattoolog.de/tools/cities/?country=${country}&page_size=1000`;

export const ReserveForm = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLodading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // const params = useParams();
  const [images, setImages] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    axios.get(COUNTRIES).then((res) => setCountries(res.data));
  }, []);

  useEffect(() => {
    axios.get(CITIES(selectedCountry)).then((res) => setCities(res.data));
  }, [selectedCountry]);

  // const validationSchema = yup.object().shape({
  //   desiredPlace: yup.string().required(t("form_validation.required")),
  //   name: yup.string().required(t("form_validation.required")),
  //   phone: yup
  //     .string()
  //     .phone([], t("form_validation.invalid_phone"))
  //     .required(t("form_validation.required")),
  //   link: yup.string().required(t("form_validation.required")),
  //   place: yup.string().required(t("form_validation.required")),
  //   terms: yup.boolean().oneOf([true], t("form_validation.required")),
  // });
  const initialValues = {
    country: "",
    city: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    about: "",
    avatar: "",
    posts: [],
  };

  const loadImages = (files) => {
    const filesArray = Array.from(files);
    Promise.all(
      filesArray.map(async (file) => ({
        name: file.name,
        type: file.type,
        extension: file.name.split(".")[file.name.split(".").length - 1],
        base64: await toBase64(file).then((res) => res),
      }))
    ).then((res) => {
      setImages(res);
    });
  };

  const loadAvatar = (files) => {
    const filesArray = Array.from(files);
    Promise.all(
      filesArray.map(async (file) => ({
        name: file.name,
        type: file.type,
        extension: file.name.split(".")[file.name.split(".").length - 1],
        base64: await toBase64(file).then((res) => res),
      }))
    ).then((res) => {
      setAvatar(res);
    });
  };

  const submitForm = (formData) => {
    setIsLodading(true);
    const data = {
      country: formData.country,
      city: formData.city,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      about: formData.about,
      avatar: avatar.map((el) => {
        return el.base64;
      }),
      posts: images.map((el) => {
        return el.base64;
      }),
    };

    console.log(data);

    // axios
    //   .post(`${getAPIAddrPL()}/api/v1/candidates/employees/`, data)
    //   .then(() => {
    //     setIsSuccess(true);
    //   })
    //   .catch(() => {
    //     setIsError(true);
    //   })
    //   .finally(() => {
    //     setIsLodading(false);
    //   });
  };

  return (
    <div style={{ flex: 1, position: "relative" }}>
      <div
        style={{
          backgroundImage:
            "url(https://thumb.tildacdn.com/tild6662-3363-4466-b438-356662386230/-/format/webp/preillumination-seth.jpg)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage:
            "linear-gradient(to bottom, rgba(23,23,23,0.9), rgba(23,23,23,0.9))",
        }}
      ></div>
      <Container className="py-5">
        <Row className="justify-content-md-center">
          <Col xs={12} lg={5}>
            {!isSuccess && !isError && (
              <Card>
                <Card.Body>
                  <Formik
                    // validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={submitForm}
                  >
                    {({
                      handleSubmit,
                      touched,
                      handleChange,
                      errors,
                      values,
                    }) => (
                      <Form noValidate onSubmit={handleSubmit}>
                        <Stack gap={3}>
                          <Form.Group>
                            <Form.Label>Country</Form.Label>
                            <Form.Select
                              name="country"
                              type="text"
                              value={values.country}
                              onChange={(e) => {
                                handleChange(e);
                                setSelectedCountry(e.target.value);
                              }}
                              isInvalid={
                                !!errors.desiredPlace && touched.desiredPlace
                              }
                            >
                              {countries.results?.map((el) => (
                                <option value={el.name} key={el.id}>
                                  {el.name}
                                </option>
                              ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.desiredPlace}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>City</Form.Label>
                            <Form.Select
                              name="city"
                              type="text"
                              value={values.city}
                              onChange={handleChange}
                              isInvalid={
                                !!errors.desiredPlace && touched.desiredPlace
                              }
                            >
                              {cities.results?.map((el) => (
                                <option value={el.name} key={el.id}>
                                  {el.name}
                                </option>
                              ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.desiredPlace}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              name="firstName"
                              type="text"
                              value={values.firstName}
                              onChange={handleChange}
                              isInvalid={
                                !!errors.desiredPlace && touched.desiredPlace
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.desiredPlace}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              name="lastName"
                              type="text"
                              value={values.lastName}
                              onChange={handleChange}
                              isInvalid={
                                !!errors.desiredPlace && touched.desiredPlace
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.desiredPlace}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>About</Form.Label>
                            <Form.Control
                              as="textArea"
                              name="about"
                              type="text"
                              value={values.about}
                              onChange={handleChange}
                              isInvalid={
                                !!errors.desiredPlace && touched.desiredPlace
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.desiredPlace}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              name="email"
                              type="text"
                              value={values.email}
                              onChange={handleChange}
                              isInvalid={
                                !!errors.desiredPlace && touched.desiredPlace
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.desiredPlace}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                              name="phone"
                              type="text"
                              value={values.phone}
                              onChange={handleChange}
                              isInvalid={
                                !!errors.desiredPlace && touched.desiredPlace
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.desiredPlace}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Avatar</Form.Label>
                            <Form.Control
                              name="avatar"
                              type="file"
                              multiple={false}
                              accept=".jpg, .png, .jpeg"
                              onChange={(e) => loadAvatar(e.target.files)}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.desiredPlace}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Your works</Form.Label>
                            <Form.Control
                              name="works"
                              type="file"
                              multiple
                              accept=".jpg, .png, .jpeg"
                              onChange={(e) => loadImages(e.target.files)}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.desiredPlace}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Button
                            className="art-inc-button-gold"
                            disabled={isLoading}
                            type="submit"
                          >
                            {isLoading && (
                              <Spinner className="me-2" size="sm" />
                            )}
                            <span>{t("control_buttons.submit")}</span>
                          </Button>
                        </Stack>
                      </Form>
                    )}
                  </Formik>
                </Card.Body>
              </Card>
            )}
            {isSuccess && (
              <Result
                icon={<CheckCircle />}
                variant="Success"
                header={t("messages.success")}
              />
            )}
            {isError && (
              <Result
                icon={<XCircle />}
                variant="danger"
                header={t("messages.error")}
                message={t("messages.error_msg")}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
