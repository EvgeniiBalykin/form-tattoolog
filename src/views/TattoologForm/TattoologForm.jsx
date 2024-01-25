import React, { useEffect, useState } from "react";
import * as yup from "yup";
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
import { toBase64 } from "../../helpers/toBase64";

const COUNTRIES = "https://tattoolog.de/tools/countries/?page_size=400";
const CITIES = (country) =>
  `https://tattoolog.de/tools/cities/?country=${country}&page_size=1000`;

export const TattologForm = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLodading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    axios.get(COUNTRIES).then((res) => setCountries(res.data));
  }, []);

  useEffect(() => {
    axios.get(CITIES(selectedCountry)).then((res) => setCities(res.data));
  }, [selectedCountry]);

  const validationSchema = yup.object().shape({
    country: yup.string().required(t("form_validation.required")),
    city: yup.string().required(t("form_validation.required")),
    socialLink: yup.string().required(t("form_validation.required")),
    firstName: yup.string().required(t("form_validation.required")),
    lastName: yup.string().required(t("form_validation.required")),
    email: yup
      .string()
      .email(t("form_validation.invalid_email"))
      .required(t("form_validation.required")),
    phone: yup.string().required(t("form_validation.required")),
    about: yup.string().required(t("form_validation.required")),
    avatar: yup.string().required(t("form_validation.required")),
    works: yup
      .array()
      .min(1, t("form_validation.min_one_work"))
      .required(t("form_validation.required")),
  });

  const initialValues = {
    country: "",
    socialLink: "",
    city: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    about: "",
    avatar: "",
    works: [],
  };

  const loadImages = async (files) => {
    const result = await Promise.all(
      files.map(async (file) => ({
        name: file.name,
        type: file.type,
        extension: file.name.split(".")[file.name.split(".").length - 1],
        base64: await toBase64(file),
      }))
    );

    return result;
  };

  const submitForm = async (formData) => {
    setIsLodading(true);
    const base64Avatar = await toBase64(formData.avatar);
    const base64Works = await loadImages(formData.works);

    const data = {
      country: formData.country,
      city: formData.city,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      about: formData.about,
      social_link: formData.socialLink,
      avatar: base64Avatar,
      images: base64Works.map((el) => el.base64),
    };

    return axios
      .post(`https://cr.vean-tattoo.pl/api/v1/candidates/employees/`, data)
      .then(() => {
        setIsSuccess(true);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLodading(false);
      });
  };

  return (
    <div style={{ flex: 1, position: "relative" }}>
      <div
        style={{
          backgroundImage:
            "url(https://thumb.tildacdn.com/tild6662-3363-4466-b438-356662386230/-/format/webp/preillumination-seth.jpg)",
          position: "absolute",
          backgroundSize: "cover",
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
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={submitForm}
                  >
                    {({
                      handleSubmit,
                      touched,
                      handleChange,
                      errors,
                      values,
                      setFieldValue,
                    }) => {
                      return (
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
                                isInvalid={!!errors.country && touched.country}
                              >
                                {countries.results?.map((el) => (
                                  <option value={el.name} key={el.id}>
                                    {el.name}
                                  </option>
                                ))}
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                {errors.country}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                              <Form.Label>City</Form.Label>
                              <Form.Select
                                name="city"
                                type="text"
                                value={values.city}
                                onChange={handleChange}
                                isInvalid={!!errors.city && touched.city}
                              >
                                {cities.results?.map((el) => (
                                  <option value={el.name} key={el.id}>
                                    {el.name}
                                  </option>
                                ))}
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                {errors.city}
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
                                  !!errors.firstName && touched.firstName
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.firstName}
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
                                  !!errors.lastName && touched.lastName
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.lastName}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                              <Form.Label>Social link</Form.Label>
                              <Form.Control
                                name="socialLink"
                                type="text"
                                value={values.socialLink}
                                onChange={handleChange}
                                isInvalid={
                                  !!errors.socialLink && touched.socialLink
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.socialLink}
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
                                isInvalid={!!errors.about && touched.about}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.about}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                name="email"
                                type="text"
                                value={values.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email && touched.email}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.email}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                              <Form.Label>Phone</Form.Label>
                              <Form.Control
                                name="phone"
                                type="tel"
                                value={
                                  values.phone.startsWith("+")
                                    ? values.phone
                                    : "+" + values.phone
                                }
                                onChange={handleChange}
                                isInvalid={!!errors.phone && touched.phone}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.phone}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                              <Form.Label>Avatar</Form.Label>
                              <Form.Control
                                name="avatar"
                                type="file"
                                multiple={false}
                                accept=".jpg, .png, .jpeg"
                                onChange={(event) => {
                                  setFieldValue(
                                    "avatar",
                                    event.currentTarget.files[0]
                                  );
                                }}
                                isInvalid={!!errors.avatar && touched.avatar}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.avatar}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                              <Form.Label>Your works</Form.Label>
                              <Form.Control
                                name="works"
                                type="file"
                                multiple
                                accept=".jpg, .png, .jpeg"
                                onChange={(event) => {
                                  setFieldValue(
                                    "works",
                                    Object.values(event.currentTarget.files)
                                  );
                                }}
                                isInvalid={!!errors.works && touched.works}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.works}
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
                      );
                    }}
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
