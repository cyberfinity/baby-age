import { APIGatewayEvent, Context, APIGatewayProxyResult  } from 'aws-lambda'
import { parse as queryStringParse } from 'querystring';

function leftFillNum(num: number, targetLength: number): string {
  return num.toString().padStart(targetLength, '0');
}

export async function handler (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> {

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method not allowed. Only POST requests are supported by this endpoint.',
    }
  }

  const formData = queryStringParse(event.body);

  const day = parseInt(formData.day as string);
  const month = parseInt(formData.month as string);
  const year = parseInt(formData.year as string);



  return {
    statusCode: 303,
    headers: {
      location: `https://baby-age.cyberfinity.net/${leftFillNum(year, 4)}/${leftFillNum(month, 2)}/${leftFillNum(day, 2)}/`,
    },
    body: '',
  };
}
