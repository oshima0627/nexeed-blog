import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', fontSize: 60, fontWeight: 'bold' }}>
          <span style={{ background: 'linear-gradient(135deg, #7C3AED, #A78BFA)', backgroundClip: 'text', color: 'transparent' }}>
            N
          </span>
          <span style={{ color: '#000000' }}>
            exeed
          </span>
        </div>
        <div style={{ display: 'flex', fontSize: 60, fontWeight: 'bold', marginTop: -10 }}>
          <span style={{ background: 'linear-gradient(135deg, #60A5FA, #3B82F6)', backgroundClip: 'text', color: 'transparent' }}>
            B
          </span>
          <span style={{ background: 'linear-gradient(135deg, #A78BFA, #7C3AED)', backgroundClip: 'text', color: 'transparent' }}>
            log
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
