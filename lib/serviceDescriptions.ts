export interface ServiceDescription {
  id: string
  title: string
  tagline: string
  overview: string
  whyChoose: {
    title: string
    description: string
  }[]
  keyHighlights: {
    title: string
    description: string
  }[]
  delivery: string
  frequency: string
  holdingPeriod: string
  whoIsItFor: string[]
  howRecommendationsWork: {
    title: string
    points: string[]
  }
  importantNote: string
  riskNote: string
}

export const serviceDescriptions: Record<string, ServiceDescription> = {
  'Intraday Alpha': {
    id: 'intraday-alpha',
    title: 'Intraday Alpha',
    tagline: 'Smart Opportunities for Active Traders',
    overview: 'Intraday Alpha is a cash-market intraday trading research service offered by FortuneKraft Consultancy, designed for traders looking to capture short-term opportunities within the same trading day. Our experienced research professionals analyze market movements using structured technical methods to identify high-potential trading setups. The objective of this service is to help traders act quickly on well-researched opportunities and potentially improve trading efficiency through disciplined execution.',
    whyChoose: [
      {
        title: 'Advanced Technical Research',
        description: 'Our market analysts rely on professional technical tools and proven strategies to identify short-term trading opportunities in actively traded stocks.',
      },
      {
        title: 'Focus on Momentum-Driven Stocks',
        description: 'Instead of providing numerous random suggestions, we focus on stocks displaying strong momentum and favorable risk-reward potential during the trading session.',
      },
      {
        title: 'Real-Time Trading Updates',
        description: 'Subscribers receive alerts from the moment a trade setup is generated until the position is closed, helping them stay informed throughout the trading day.',
      },
    ],
    keyHighlights: [
      {
        title: 'Daily Trading Opportunities',
        description: 'Subscribers generally receive at least one trade idea per day, and occasionally more depending on market activity and trading conditions.',
      },
      {
        title: 'Intraday Holding Period',
        description: 'All trades suggested under Intraday Alpha are strictly intraday in nature, meaning positions are typically exited before the market closes and are not carried overnight.',
      },
      {
        title: 'Clearly Defined Entry Levels',
        description: 'Every trading alert includes specific entry levels, allowing traders enough time to place their orders and participate in the opportunity.',
      },
      {
        title: 'Guided Exit Strategy',
        description: 'Follow-up alerts are provided when important price levels are reached, including target achievement, trailing stop-loss adjustments, stop-loss triggers, and exit notifications. These updates help traders manage risk and lock profits effectively.',
      },
    ],
    delivery: 'All recommendations are delivered instantly through Telegram / WhatsApp groups, ensuring subscribers never miss an opportunity.',
    frequency: '1–2 trades per day',
    holdingPeriod: 'Same Day Exit',
    whoIsItFor: [
      'Active intraday traders',
      'Traders seeking technical analysis-based trade ideas',
      'Market participants looking for short-term opportunities',
      'Beginners who want structured trading guidance',
    ],
    howRecommendationsWork: {
      title: 'How Recommendations Are Provided',
      points: [
        'Buy above price',
        'Sell below price',
        'Stop-loss level',
        'Profit targets',
      ],
    },
    importantNote: 'Intraday trading involves rapid market movements. Traders are encouraged to monitor positions actively and follow updates shared during the trade to manage risk effectively.',
    riskNote: 'Intraday trading involves rapid market movements and carries inherent risk. Past performance does not guarantee future results. Investment in securities market are subject to market risks.',
  },

  'BTST Alpha': {
    id: 'btst-alpha',
    title: 'BTST Alpha',
    tagline: 'Capture Overnight Momentum Opportunities',
    overview: 'BTST Alpha (Buy Today, Sell Tomorrow) is a trading service offered by FortuneKraft Consultancy, designed for traders who want to benefit from potential overnight price momentum in carefully selected stocks. The strategy focuses on identifying equities that may open stronger the following trading day due to momentum, market positioning, or technical setups. Instead of monitoring the markets constantly throughout the day, this service allows traders to take a position near the end of the trading session and exit the trade on the next day, aiming to capture favourable price movements at the opening or during early market hours.',
    whyChoose: [
      {
        title: 'Focused Stock Selection',
        description: 'Only liquid stocks with strong trading interest and favourable setups are considered, ensuring quality over quantity.',
      },
      {
        title: 'Short Holding Period',
        description: 'Trades are usually carried overnight and closed during the following trading day, keeping exposure short and controlled.',
      },
      {
        title: 'Research-Driven Approach',
        description: 'Stocks are selected after evaluating technical structure, volume behaviour, and momentum potential through a structured research process.',
      },
      {
        title: 'Time Efficient',
        description: 'Designed for traders who want exposure to short-term opportunities without monitoring the markets throughout the entire day.',
      },
    ],
    keyHighlights: [
      {
        title: 'One High-Conviction Trade Per Day',
        description: 'The service generally provides one carefully researched BTST opportunity per trading day, depending on market conditions.',
      },
      {
        title: 'Optimal Entry Timing',
        description: 'Trades are typically issued during the later part of the trading session between 2:45 PM and 3:15 PM, so traders can prepare their positions before the market closes.',
      },
      {
        title: 'Clear Trade Parameters',
        description: 'Each recommendation includes defined entry levels, targets, and risk control measures to help traders execute with clarity and discipline.',
      },
      {
        title: 'Overnight to Next Morning',
        description: 'The position is carried overnight and exited the next day as per the suggested target or risk management level, aiming to capture gap-up openings or continuation moves.',
      },
    ],
    delivery: 'All recommendations and updates are delivered in real time through WhatsApp / Telegram group with instant updates for trade activation or exit.',
    frequency: '1 trade per day',
    holdingPeriod: 'Exit next day morning',
    whoIsItFor: [
      'Active traders seeking short-term opportunities',
      'Market participants comfortable with overnight positions',
      'Traders looking for structured trade setups with predefined risk levels',
      'Individuals who prefer fewer but high-conviction trade ideas',
    ],
    howRecommendationsWork: {
      title: 'What You Receive',
      points: [
        'Stock Name',
        'Entry Price Range',
        'Target Level',
        'Stop Loss',
        'Trade Updates (activation, exit, or stop-loss triggers)',
      ],
    },
    importantNote: 'BTST trading involves overnight exposure and therefore carries higher risk due to potential market gaps or unexpected news events. Proper position sizing and strict adherence to risk management guidelines are strongly recommended.',
    riskNote: 'BTST trading involves overnight exposure and carries higher risk due to potential market gaps or unexpected news events. Investment in securities market are subject to market risks.',
  },

  'Positional Alpha': {
    id: 'positional-alpha',
    title: 'Positional Alpha',
    tagline: 'Capture Short-Term Market Trends with Strategic Trades',
    overview: 'Positional Alpha by FortuneKraft Consultancy is a positional trading research service designed for traders and investors who want to benefit from short-term market trends without the pressure of daily trading. Unlike intraday strategies, positional trading focuses on holding stocks for several days to a few weeks to capture meaningful price movements. This service identifies potential opportunities using a combination of technical analysis, market structure evaluation, and momentum indicators. The objective is to help traders participate in emerging trends while following disciplined entry and exit strategies supported by research-driven insights.',
    whyChoose: [
      {
        title: 'Designed for Short-Term Trend Trading',
        description: 'This service is ideal for traders who prefer holding positions for a few days or weeks rather than actively trading throughout the day.',
      },
      {
        title: 'Quality-Focused Trade Selection',
        description: 'The research team identifies opportunities with favourable risk-reward setups and strong technical structures, focusing on quality over quantity.',
      },
      {
        title: 'Structured Trading Approach',
        description: 'Recommendations are designed to help traders capture short-term trends while maintaining proper risk management throughout the holding period.',
      },
    ],
    keyHighlights: [
      {
        title: 'Positional Trading Opportunities',
        description: 'Typically 3–4 positional trade opportunities may be shared in a month, depending on the availability of strong setups in the market. The focus is on quality opportunities rather than frequent trading signals.',
      },
      {
        title: 'Defined Holding Period',
        description: 'Trades are generally held for a few days to a couple of weeks, approximately 2 weeks on average, depending on market conditions and price movements.',
      },
      {
        title: 'Clear Entry Guidance',
        description: 'Each recommendation is shared with a suggested entry range so traders can participate in the opportunity comfortably without rushing.',
      },
      {
        title: 'Ongoing Trade Updates',
        description: 'Subscribers receive updates whenever important developments occur in the trade, such as target achievement, stop-loss triggers, or strategy adjustments.',
      },
      {
        title: 'Controlled Number of Positions',
        description: 'To maintain effective monitoring and risk control, only a limited number of trades may remain active simultaneously, keeping portfolio management simple.',
      },
      {
        title: 'Long-Only Cash Market Trades',
        description: 'Recommendations are generally provided in liquid stocks in the cash segment with strict stop-loss levels always defined to help protect capital.',
      },
    ],
    delivery: 'All trade alerts and updates are delivered instantly through Telegram / WhatsApp groups ensuring subscribers receive recommendations quickly and can take action at the right time.',
    frequency: '3–4 trades per month',
    holdingPeriod: 'Approximately 2 weeks',
    whoIsItFor: [
      'Traders looking for short-term trend opportunities',
      'Individuals who prefer less frequent trading compared to intraday strategies',
      'Investors seeking structured positional trade ideas',
      'Beginners who want research-backed trading guidance',
    ],
    howRecommendationsWork: {
      title: 'What You Receive',
      points: [
        'Entry range for comfortable participation',
        'Clearly defined target levels',
        'Stop-loss points for capital protection',
        'Ongoing trade updates and adjustments',
        'Exit notifications when targets or stop-loss are hit',
      ],
    },
    importantNote: 'Positional trading involves market risk and price fluctuations over multiple days. Traders are encouraged to follow recommended entry levels, stop-loss guidelines, and position sizing strategies to manage risk effectively.',
    riskNote: 'Positional trading involves market risk and price fluctuations over multiple days. Investment in securities market are subject to market risks. Read all related documents carefully before investing.',
  },
}
