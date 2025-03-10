import styled from "styled-components";

const Card_inicio = ({ icon, title, data }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <section className="card-icon">
          <div dangerouslySetInnerHTML={{ __html: icon }} />
        </section>
        <section className="card-title">
          <p>
            {title}
          </p>
        </section>
        <section className="card-data">
          <span>
            {data}
          </span>
        </section>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 190px;
    height: 254px;
    background: rgb(236, 236, 236);
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
`;

export default Card_inicio;
