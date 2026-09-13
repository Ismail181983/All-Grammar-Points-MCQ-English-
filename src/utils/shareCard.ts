import { BadgeProgress } from '../types';

export interface ShareCardData {
  studentName: string;
  roll: string;
  modelTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpentSeconds: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  badges: BadgeProgress[];
  dateString?: string;
}

/**
 * Format duration into mm:ss or mm m ss s
 */
export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${s}s`;
}

/**
 * Generate formatted text snippet ready for clipboard copying or messaging
 */
export function generateShareTextSnippet(data: ShareCardData): string {
  const unlockedBadges = data.badges.filter((b) => b.isUnlocked);
  const timeFormatted = formatDuration(data.timeSpentSeconds);
  const performanceGrade =
    data.percentage >= 90
      ? 'Outstanding 🌟'
      : data.percentage >= 80
      ? 'Excellent 🎯'
      : data.percentage >= 70
      ? 'Very Good 👏'
      : data.percentage >= 60
      ? 'Passed 📘'
      : 'Keep Practicing 💪';

  let text = `🎯 ENGLISH GRAMMAR MODEL TEST RESULT\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `👤 Candidate: ${data.studentName} (Roll: ${data.roll})\n`;
  text += `📝 Test Set: ${data.modelTitle}\n`;
  text += `📊 Score: ${data.score}/${data.totalQuestions} (${data.percentage}%)\n`;
  text += `🎖️ Evaluation: ${performanceGrade}\n`;
  text += `⏱️ Time Taken: ${timeFormatted}\n`;
  text += `✅ Correct: ${data.correctCount}  |  ❌ Incorrect: ${data.wrongCount}`;
  if (data.unansweredCount > 0) {
    text += `  |  ⏭️ Skipped: ${data.unansweredCount}`;
  }
  text += `\n`;

  if (unlockedBadges.length > 0) {
    text += `\n🏆 Badges Earned (${unlockedBadges.length}):\n`;
    unlockedBadges.slice(0, 6).forEach((b) => {
      text += `  • [${b.tier.toUpperCase()}] ${b.title} — ${b.subtitle}\n`;
    });
    if (unlockedBadges.length > 6) {
      text += `  • ...and ${unlockedBadges.length - 6} more trophy badges!\n`;
    }
  }

  text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `✨ English Grammar Practice Platform (35 Sets • 875 MCQs)\n`;

  return text;
}

/**
 * Generate full JSON export of the score details for record keeping
 */
export function generateScoreDetailsExport(data: ShareCardData): string {
  const exportPayload = {
    app: 'English Grammar Model Question Practice Platform',
    exportedAt: new Date().toISOString(),
    candidate: {
      name: data.studentName,
      roll: data.roll,
    },
    exam: {
      modelTitle: data.modelTitle,
      totalQuestions: data.totalQuestions,
      score: data.score,
      percentage: data.percentage,
      correctAnswers: data.correctCount,
      wrongAnswers: data.wrongCount,
      unanswered: data.unansweredCount,
      timeSpentSeconds: data.timeSpentSeconds,
      timeFormatted: formatDuration(data.timeSpentSeconds),
    },
    unlockedBadges: data.badges
      .filter((b) => b.isUnlocked)
      .map((b) => ({
        id: b.id,
        title: b.title,
        tier: b.tier,
        category: b.category,
        description: b.description,
      })),
  };

  return JSON.stringify(exportPayload, null, 2);
}

/**
 * Draw rounded rectangle helper for canvas
 */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Generates an HTML5 Canvas summary card image blob (1200x675)
 */
export async function generateShareCardBlob(data: ShareCardData): Promise<Blob> {
  const canvas = document.createElement('canvas');
  const width = 1200;
  const height = 675;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context is not available');
  }

  // 1. Dark Modern Background with radial gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#0F172A'); // Slate 900
  bgGrad.addColorStop(0.5, '#0B1120'); // Deep Slate
  bgGrad.addColorStop(1, '#030712'); // Gray 950
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Decorative ambient glow spots
  const glow1 = ctx.createRadialGradient(200, 150, 20, 200, 150, 450);
  glow1.addColorStop(0, 'rgba(6, 182, 212, 0.22)'); // Cyan glow
  glow1.addColorStop(1, 'rgba(6, 182, 212, 0)');
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, width, height);

  const glow2 = ctx.createRadialGradient(1000, 500, 20, 1000, 500, 450);
  glow2.addColorStop(0, 'rgba(59, 130, 246, 0.18)'); // Blue glow
  glow2.addColorStop(1, 'rgba(59, 130, 246, 0)');
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, width, height);

  const glow3 = ctx.createRadialGradient(600, 300, 10, 600, 300, 300);
  glow3.addColorStop(0, 'rgba(245, 158, 11, 0.12)'); // Amber subtle center glow
  glow3.addColorStop(1, 'rgba(245, 158, 11, 0)');
  ctx.fillStyle = glow3;
  ctx.fillRect(0, 0, width, height);

  // Outer Border Frame
  ctx.strokeStyle = 'rgba(34, 211, 238, 0.35)';
  ctx.lineWidth = 4;
  roundRect(ctx, 24, 24, width - 48, height - 48, 28);
  ctx.stroke();

  // Subtle inner card outline
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1.5;
  roundRect(ctx, 32, 32, width - 64, height - 64, 24);
  ctx.stroke();

  // 2. Header Area
  // Top Badge Tag
  ctx.fillStyle = 'rgba(6, 182, 212, 0.2)';
  roundRect(ctx, 56, 52, 280, 32, 16);
  ctx.fill();
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.5)';
  ctx.lineWidth = 1.5;
  roundRect(ctx, 56, 52, 280, 32, 16);
  ctx.stroke();

  ctx.font = 'bold 13px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#22D3EE';
  ctx.textAlign = 'left';
  ctx.fillText('OFFICIAL SCORECARD & PROGRESS', 72, 73);

  // Date Tag on Right
  const dateStr = data.dateString || new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  ctx.font = '14px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.textAlign = 'right';
  ctx.fillText(`Date: ${dateStr}`, width - 56, 73);

  // Title: English Grammar Practice Platform
  ctx.font = '900 32px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'left';
  ctx.fillText(data.modelTitle, 56, 130);

  // Subtitle: Candidate details
  ctx.font = '500 18px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText('Candidate: ', 56, 162);

  ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#38BDF8'; // Sky 400
  ctx.fillText(data.studentName, 146, 162);

  const nameWidth = ctx.measureText(data.studentName).width;
  ctx.font = '500 18px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText(`  •  Roll: `, 146 + nameWidth, 162);

  ctx.font = 'bold 18px monospace';
  ctx.fillStyle = '#FBBF24'; // Amber 400
  ctx.fillText(data.roll, 146 + nameWidth + 82, 162);

  // 3. Central Highlights Grid (4 Stat Cards)
  const cardY = 200;
  const cardH = 145;
  const cardW = 256;
  const gap = 20;
  const startX = 56;

  // Stat Card 1: Score
  drawStatCard(
    ctx,
    startX,
    cardY,
    cardW,
    cardH,
    'SCORE',
    `${data.score} / ${data.totalQuestions}`,
    `${data.percentage}% Marks`,
    '#38BDF8',
    'rgba(56, 189, 248, 0.12)',
    'rgba(56, 189, 248, 0.35)'
  );

  // Stat Card 2: Right Answers
  drawStatCard(
    ctx,
    startX + cardW + gap,
    cardY,
    cardW,
    cardH,
    'RIGHT ANSWERS',
    `${data.correctCount}`,
    `${Math.round((data.correctCount / data.totalQuestions) * 100)}% Accuracy`,
    '#34D399',
    'rgba(52, 211, 153, 0.12)',
    'rgba(52, 211, 153, 0.35)'
  );

  // Stat Card 3: Wrong / Skipped
  drawStatCard(
    ctx,
    startX + (cardW + gap) * 2,
    cardY,
    cardW,
    cardH,
    'WRONG / SKIPPED',
    `${data.wrongCount} W / ${data.unansweredCount} S`,
    data.wrongCount === 0 ? 'Flawless 0 Errors!' : `${data.wrongCount} Needs Review`,
    '#FB7185',
    'rgba(251, 113, 133, 0.12)',
    'rgba(251, 113, 133, 0.35)'
  );

  // Stat Card 4: Duration
  drawStatCard(
    ctx,
    startX + (cardW + gap) * 3,
    cardY,
    cardW,
    cardH,
    'TIME DURATION',
    formatDuration(data.timeSpentSeconds),
    `Avg ${(data.timeSpentSeconds / data.totalQuestions).toFixed(1)}s / MCQ`,
    '#FBBF24',
    'rgba(251, 191, 36, 0.12)',
    'rgba(251, 191, 36, 0.35)'
  );

  // 4. Badges and Trophies Showcase Section
  const unlockedBadges = data.badges.filter((b) => b.isUnlocked);
  const badgeSectionY = 375;

  ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
  roundRect(ctx, 56, badgeSectionY, width - 112, 190, 20);
  ctx.fill();
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
  ctx.lineWidth = 1;
  roundRect(ctx, 56, badgeSectionY, width - 112, 190, 20);
  ctx.stroke();

  // Badges Header
  ctx.font = 'bold 16px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'left';
  ctx.fillText('🏆 Current Badges & Achievements', 80, badgeSectionY + 36);

  ctx.font = '14px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#38BDF8';
  ctx.textAlign = 'right';
  ctx.fillText(
    `${unlockedBadges.length} of ${data.badges.length} Unlocked`,
    width - 80,
    badgeSectionY + 36
  );

  // Badge Chips Row
  const displayBadges = unlockedBadges.slice(0, 4);
  if (displayBadges.length === 0) {
    ctx.font = 'italic 16px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#94A3B8';
    ctx.textAlign = 'center';
    ctx.fillText(
      'Take more tests to unlock prestigious Grammatical Mastery & Speed Trophies!',
      width / 2,
      badgeSectionY + 110
    );
  } else {
    const chipW = 246;
    const chipH = 100;
    const chipGap = 18;
    const chipStartX = 80;
    const chipY = badgeSectionY + 60;

    displayBadges.forEach((badge, idx) => {
      const chipX = chipStartX + idx * (chipW + chipGap);

      // Chip Background
      ctx.fillStyle = 'rgba(30, 41, 59, 0.85)';
      roundRect(ctx, chipX, chipY, chipW, chipH, 14);
      ctx.fill();

      // Tier border
      const tierColor =
        badge.tier === 'diamond'
          ? '#22D3EE'
          : badge.tier === 'platinum'
          ? '#A855F7'
          : badge.tier === 'gold'
          ? '#FBBF24'
          : badge.tier === 'silver'
          ? '#94A3B8'
          : '#FB923C';

      ctx.strokeStyle = tierColor;
      ctx.lineWidth = 1.5;
      roundRect(ctx, chipX, chipY, chipW, chipH, 14);
      ctx.stroke();

      // Tier pill
      ctx.fillStyle = tierColor;
      roundRect(ctx, chipX + 12, chipY + 12, 54, 18, 6);
      ctx.fill();

      ctx.font = '900 10px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#0F172A';
      ctx.textAlign = 'center';
      ctx.fillText(badge.tier.toUpperCase(), chipX + 12 + 27, chipY + 25);

      // Badge title
      ctx.font = 'bold 15px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'left';
      ctx.fillText(badge.title, chipX + 12, chipY + 54);

      // Badge subtitle
      ctx.font = '11px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#94A3B8';
      ctx.fillText(badge.subtitle, chipX + 12, chipY + 74);
    });
  }

  // 5. Footer Branding Bar
  ctx.fillStyle = '#64748B';
  ctx.font = '13px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('English Grammar Practice Platform • 35 Sets • 875 MCQs with Explanations', 56, height - 42);

  ctx.textAlign = 'right';
  ctx.fillText('Generated via GrammarQuiz Progress Share', width - 56, height - 42);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Failed to generate image blob from canvas'));
      }
    }, 'image/png');
  });
}

/**
 * Helper to draw a single stat card on the canvas
 */
function drawStatCard(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  title: string,
  val: string,
  sub: string,
  accentColor: string,
  bgColor: string,
  borderColor: string
) {
  // Background
  ctx.fillStyle = bgColor;
  roundRect(ctx, x, y, w, h, 18);
  ctx.fill();

  // Border
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 1.5;
  roundRect(ctx, x, y, w, h, 18);
  ctx.stroke();

  // Title
  ctx.font = 'bold 12px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.textAlign = 'left';
  ctx.fillText(title, x + 18, y + 32);

  // Big Value
  ctx.font = '900 28px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = accentColor;
  ctx.fillText(val, x + 18, y + 80);

  // Subtitle
  ctx.font = '500 13px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#E2E8F0';
  ctx.fillText(sub, x + 18, y + 116);
}

/**
 * Copy an Image Blob to the system clipboard
 */
export async function copyImageBlobToClipboard(blob: Blob): Promise<boolean> {
  try {
    if (!navigator.clipboard || !window.ClipboardItem) {
      return false;
    }
    await navigator.clipboard.write([
      new ClipboardItem({
        'image/png': blob,
      }),
    ]);
    return true;
  } catch (err) {
    console.warn('Clipboard image write failed:', err);
    return false;
  }
}

/**
 * Copy text string to system clipboard with fallback
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older browsers / iframe contexts
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.warn('Clipboard text write failed:', err);
    return false;
  }
}
