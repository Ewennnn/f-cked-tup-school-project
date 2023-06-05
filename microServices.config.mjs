'use strict'

import { HttpsProxyAgent } from 'https-proxy-agent'
import fetch from 'node-fetch'

export const ports = {
    meteo: 3001,
    places: 3002,
    users: 3003,
    location: 3004,
    API: 3200
}

const proxy = process.env.https_proxy
export const proxyAgent = proxy != null ? new HttpsProxyAgent(proxy) : null

if (proxyAgent != null) {
    console.log(`Proxy: ${proxy}`);
} else {
    console.warn("No proxy was found");
}

export default async function fetchUsingAgent(url) {
    return proxyAgent != null ? await fetch(url, {agent: proxyAgent}) : await fetch(url)
}