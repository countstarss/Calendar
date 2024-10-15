import { NextResponse } from 'next/server';
import * as jwt from 'jsonwebtoken';

// 为 POST 方法导出
export async function POST() {
  const privateKey = `-----BEGIN PRIVATE KEY-----
                      MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgkKNqeer5BjAFEbsD
                      Rp3mHVrnw8GqpOWilKK+mpNmRnygCgYIKoZIzj0DAQehRANCAASQXN+/1+MMxp6v
                      BnYQgAWalewYAY7E6SmcvWpxdJu1qrShNYyGHxOlOotvdqkTjgW1f/QJTJEzEGeF
                      OiEQW7WP
                      -----END PRIVATE KEY-----`.replace(/\\n/g, '\n');

  if (!privateKey) {
    return NextResponse.json({ error: 'Private key is missing' }, { status: 500 });
  }

  try {
    const token = jwt.sign({}, privateKey, {
      expiresIn: '1h',
      audience: 'https://appleid.apple.com',
      subject: 'zone.insightlab.calender',
      issuer: 'JF56Q52HA5',
      header: {
        alg: 'ES256',
        kid: 'PQ8NHWB8TT',
        typ: 'JWT',
      },
    });

    // 成功生成 token，返回 JSON 响应
    return NextResponse.json({ token });
  } catch (error) {
    // 捕获错误并返回错误信息
    return NextResponse.json({ error: 'Error generating token' }, { status: 500 });
  }
}