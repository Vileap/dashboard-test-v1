import React from "react";
import { Card, Col, Descriptions, Divider, Image, Modal, Row } from "antd";
import type { DescriptionsProps } from "antd";
import { Country, CountryDetails } from "@/shared/model/common";
import { EyeOutlined } from "@ant-design/icons";
import { formatAndDisplayIDD } from "@/utils/helper";

interface IProps {
  currentCountries: Country[] | undefined;
}

const { Meta } = Card;

const API_URL = process.env.NEXT_PUBLIC_API;

const CountryList = ({ currentCountries }: IProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState<Country>();
  const [data, setData] = React.useState<CountryDetails>();
  const [loading, setLoading] = React.useState(false);

  const showModal = (value: Country) => {
    setSelectedCountry(value);
    setIsModalOpen(true);
  };

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Country Name",
      children: <p>{data?.name?.common}</p>,
    },
    {
      key: "2",
      label: "Native Name",
      children: <p>{data?.name?.official}</p>,
    },
    {
      key: "3",
      label: "Population",
      children: <p>{data?.population}</p>,
    },
    {
      key: "4",
      label: "Region",
      children: <p>{data?.region}</p>,
    },
    {
      key: "5",
      label: "Sub Region",
      children: <p>{data?.subregion}</p>,
    },
    {
      key: "6",
      label: "Capital",
      children: <p>{data?.capital}</p>,
    },
    {
      key: "7",
      label: "Top Level Domain",
      children: <p>{data?.tld}</p>,
    },
    {
      key: "8",
      label: "Currencies",
      children: <p>{data?.currencies?.map((curr) => curr).join(", ")}</p>,
    },
    {
      key: "9",
      label: "Language",
      children: (
        <p>
          {data &&
            data?.languages &&
            Object.values(data?.languages)
              .map((lang) => lang)
              .join(", ")}
        </p>
      ),
    },
  ];

  const items2: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Country Calling Code",
      children: <p>{formatAndDisplayIDD(data?.idd)}</p>,
    },
    {
      key: "2",
      label: "Country Code 2",
      children: <p>{data?.cca2}</p>,
    },
    {
      key: "3",
      label: "Country Code 3",
      children: <p>{data?.cca3}</p>,
    },
  ];

  React.useEffect(() => {
    const getCountries = async () => {
      try {
        setLoading(true);
        const resp = await fetch(
          `${API_URL}/v3.1/name/${selectedCountry?.name.toLowerCase()}`
        );
        if (resp.ok) {
          const data = await resp.json();

          const value = {
            ...data[0],
            currencies: Object.keys(data[0]?.currencies).map(
              (curr) => data[0]?.currencies[curr].name
            ),
          };

          setData(value);
          setLoading(false);
        } else {
          setLoading(false);
          console.error("Error formatting data", resp.status);
        }
      } catch (err) {
        setLoading(false);
        console.error("Error fetching data", err);
      }
    };
    getCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);

  return (
    <>
      <div>
        <Row gutter={[16, 16]}>
          {currentCountries &&
            currentCountries.map((country, i) => {
              return (
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6} key={i}>
                  <Card
                    key={i}
                    hoverable
                    style={{
                      width: 360,
                      minWidth: "100%",
                    }}
                    cover={
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        alt={country.name}
                        src={country.flags}
                        style={{
                          height: "240px",
                          width: "100%",
                          objectFit: "fill",
                        }}
                      />
                    }
                    actions={[
                      <EyeOutlined
                        key="setting"
                        onClick={() => showModal(country)}
                      />,
                    ]}
                  >
                    <Meta
                      title={country.name}
                      description={
                        <div className="mt-2">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: country?.nativeLang,
                            }}
                          ></div>
                          <p>
                            Country Code 2: <span>{country.cca2}</span>
                          </p>
                          <p>
                            Country Code 3: <span>{country.cca3}</span>
                          </p>
                          <p>
                            Alternative Name:{" "}
                            <span>{country?.altSpellings}</span>
                          </p>

                          <p>
                            Country Calling Code: <span>{country.idd}</span>
                          </p>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              );
            })}
        </Row>
      </div>

      <Modal
        title="Country Details"
        open={isModalOpen}
        footer={false}
        width={1200}
        onCancel={() => setIsModalOpen(false)}
        loading={loading}
      >
        <div className="mt-2">
          <Descriptions title="Info" items={items} />
          <Descriptions
            title="Additional Info"
            items={items2}
            className="mt-2"
          />

          <Divider />

          {data?.flags.png && (
            <div>
              <h4 className="mb-2">Flag</h4>

              <Image.PreviewGroup>
                <Image
                  width={200}
                  src={data.flags.png}
                  alt={data.name.official}
                />
              </Image.PreviewGroup>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default CountryList;
