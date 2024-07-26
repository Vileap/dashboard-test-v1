import * as React from "react";
import { useCountry } from "@/context/useCountry";
import { Country } from "@/shared/model/common";
import { Col, Divider, Empty, Form, Input, Row, Select } from "antd";
import CountryList from "./partials/CountryList";

import { useRouter } from "next/router";
import Pagination from "./partials/Pagination";

const { Option } = Select;

const Dashboard = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const countries = useCountry() as Country[];
  const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];

  const { query } = useRouter();

  const [defaultRegions, setDefaultRegions] = React.useState<any>();
  const [inputValue, setInputValue] = React.useState("");
  const [currentPages, setCurrentPages] = React.useState({
    prevPage: 0,
    currentPage: 1,
    nextPage: 2,
  });
  const countriesPerPage = 8;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setCurrentPages({
      prevPage: 0,
      currentPage: 1,
      nextPage: 2,
    });
  };

  const onChangeRegion = (region: string) => {
    router.push({
      query: { region: region },
    });

    setCurrentPages({
      prevPage: 0,
      currentPage: 1,
      nextPage: 2,
    });
  };

  const filteredCountries =
    countries?.length > 0
      ? countries
          ?.filter((country) =>
            country.name.toLowerCase().includes(inputValue?.toLowerCase())
          )
          .slice(
            (currentPages.currentPage - 1) * countriesPerPage,
            currentPages.currentPage * countriesPerPage
          )
      : [];

  const onSubmit = (value: any) => {
    console.log(value);
  };

  const visibleCountries =
    countries?.length > 0
      ? countries?.filter((country) =>
          country?.name?.toLowerCase().includes(inputValue.toLowerCase())
        )
      : [];

  const totalPages = Math.ceil(
    (visibleCountries?.length || 0) / countriesPerPage
  );

  React.useEffect(() => {
    if (query) {
      console.log(query);
      setDefaultRegions(query?.region);

      form.setFields([{ name: ["region"], value: query?.region }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultRegions]);

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{
          region: defaultRegions,
        }}
      >
        <Row gutter={24}>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="country" label="Country">
              <Input
                placeholder="Search for a country.."
                onChange={handleChange}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={12}>
            <Form.Item name="region" label="Region">
              <Select onChange={onChangeRegion}>
                {regions.map((region, i) => (
                  <Option key={region} value={region}>
                    {region}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Divider />

      {filteredCountries.length ? (
        <div className="mt-2">
          <CountryList currentCountries={filteredCountries} />
          <Pagination
            currPages={currentPages}
            setCurrPages={setCurrentPages}
            totalPages={totalPages}
            currentCountries={filteredCountries}
            countryList={countries}
          />
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default Dashboard;
