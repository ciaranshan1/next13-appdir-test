

  import { GetServerSideProps } from 'next';

  // Define a type for our product data
  type Product = {
    name: string | string[] | undefined;
  };
  
  // Define a type for our props
  interface PropductProps {
    product: Product;
  }
  
  // Export the page component
  export default function productsPage({ product }: PropductProps) {
    // Render the product
    return (
      <div style={{ height: '100vh', padding: 50 }}>
        <h1 style={{ color: 'red' }}>Device Type: {product.name}</h1>
      </div>
    );
  }
  
  // Export the getServerSideProps function with GetServerSideProps type
  export const getServerSideProps: GetServerSideProps<{
    product: Product;
  }> = async (context) => {
    const {req} = context
    let devicetype = req.headers['x-atlas-device-type']
    console.log(devicetype)

    if (devicetype ==  undefined) {
      devicetype = "notset"
    }

    return {
      props: {
        product: {
          name: devicetype,
        }
      }
    }
  };
