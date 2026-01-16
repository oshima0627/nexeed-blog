import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/posts';

export const runtime = 'edge';
export const alt = 'NEXEED BLOG 記事';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// カテゴリーごとの色設定
const categoryColors: Record<string, { bg: string; text: string }> = {
  '投資': { bg: '#10B981', text: '#FFFFFF' },
  '子育て': { bg: '#F59E0B', text: '#FFFFFF' },
  'ITエンジニア': { bg: '#3B82F6', text: '#FFFFFF' },
  '副業': { bg: '#8B5CF6', text: '#FFFFFF' },
};

export default async function Image({ params }: { params: { slug: string } }) {
  try {
    const post = await getPostBySlug(params.slug);
    const categoryColor = categoryColors[post.category] || { bg: '#6B7280', text: '#FFFFFF' };

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1F2937',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #374151 2%, transparent 0%), radial-gradient(circle at 75px 75px, #374151 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            padding: '80px',
          }}
        >
          {/* メインコンテンツエリア */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '60px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* カテゴリーバッジ */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  backgroundColor: categoryColor.bg,
                  color: categoryColor.text,
                  padding: '12px 24px',
                  borderRadius: '9999px',
                  fontSize: '28px',
                  fontWeight: 'bold',
                  display: 'flex',
                }}
              >
                {post.category}
              </div>
            </div>

            {/* タイトル */}
            <div
              style={{
                fontSize: post.title.length > 40 ? '48px' : '56px',
                fontWeight: 'bold',
                color: '#111827',
                lineHeight: 1.3,
                marginBottom: 'auto',
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {post.title}
            </div>

            {/* フッター情報 */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '3px solid #E5E7EB',
                paddingTop: '24px',
                marginTop: '24px',
              }}
            >
              {/* サイト名 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: '#3B82F6',
                    display: 'flex',
                  }}
                >
                  NEXEED BLOG
                </div>
              </div>

              {/* 日付 */}
              <div
                style={{
                  fontSize: '24px',
                  color: '#6B7280',
                  display: 'flex',
                }}
              >
                {new Date(post.date).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    // エラー時はデフォルト画像を返す
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1F2937',
            color: 'white',
            fontSize: '64px',
            fontWeight: 'bold',
          }}
        >
          NEXEED BLOG
        </div>
      ),
      {
        ...size,
      }
    );
  }
}
