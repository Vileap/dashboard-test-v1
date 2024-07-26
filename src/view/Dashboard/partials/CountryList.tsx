import React from "react";
import { Card, Col, Descriptions, Modal, Row } from "antd";
import type { DescriptionsProps } from "antd";
import { Country, CountryDetails } from "@/shared/model/common";
import { EyeOutlined } from "@ant-design/icons";

interface IProps {
  currentCountries: Country[] | undefined;
}

const { Meta } = Card;

const API_URL = process.env.NEXT_PUBLIC_API;

const CountryList = ({ currentCountries }: IProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState<Country>();
  const [data, setData] = React.useState<CountryDetails>();

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

  React.useEffect(() => {
    const getCountries = async () => {
      try {
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
        } else {
          console.error("Error formatting data", resp.status);
        }
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    getCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);

  return (
    <>
      <div>
        <Row gutter={24}>
          {currentCountries &&
            currentCountries.map((country, i) => {
              return (
                <div key={i}>
                  <Col xs={24} sm={12} md={12} lg={12}>
                    <Card
                      hoverable
                      style={{
                        width: 350,
                        height: "100%",
                        marginBottom: "24px",
                      }}
                      cover={
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          alt={country.name}
                          src={country.flags}
                          style={{ height: 240 }}
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
                          <>
                            <p className="mt-2">
                              Population:{" "}
                              <span>{country.population.toLocaleString()}</span>
                            </p>
                            <p>
                              Region: <span>{country.region}</span>
                            </p>
                            <p>
                              Capital: <span>{country.capital}</span>
                            </p>
                          </>
                        }
                      />
                    </Card>
                  </Col>
                </div>
              );
            })}
        </Row>
      </div>

      <Modal
        title="Country Details"
        open={isModalOpen}
        footer={false}
        width={1000}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="mt-2">
          <Descriptions items={items} />
        </div>
      </Modal>
    </>
  );
};

export default CountryList;
