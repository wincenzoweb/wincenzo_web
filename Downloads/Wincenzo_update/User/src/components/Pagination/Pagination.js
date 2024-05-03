import React from "react";
import { Container, Pagination, Row } from "react-bootstrap";
import "./Pagination.css";

export default function ProductPagination({ current, onChange, total, pageSize }) {
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Pagination className="justify-content-center">
            {/* <Pagination.First /> */}
            <Pagination.Prev
              onClick={() => onChange(current - 1)}
              disabled={current === 1}
            />
            {[...Array(total).keys()].map((page) => (
              <Pagination.Item
                key={page + 1}
                active={current === page + 1}
                onClick={() => onChange(page + 1)}
              >
                {page + 1}
              </Pagination.Item>
            ))}
            {/* <Pagination.Ellipsis /> */}
            <Pagination.Next
              onClick={() => onChange(current + 1)}
              disabled={current === total}
            />{" "}
            {/* <Pagination.Last /> */}
          </Pagination>
        </Row>
      </Container>
    </>
  );
}
