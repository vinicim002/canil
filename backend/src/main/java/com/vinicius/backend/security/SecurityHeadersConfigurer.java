package com.vinicius.backend.security;

import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;
import org.springframework.security.web.header.writers.XXssProtectionHeaderWriter;

public final class SecurityHeadersConfigurer {

    private SecurityHeadersConfigurer() {}

    public static void apply(
            org.springframework.security.config.annotation.web.configurers.HeadersConfigurer<?> headers,
            Environment environment
    ) {
        headers.contentTypeOptions(config -> {});
        headers.frameOptions(frame -> frame.deny());
        headers.referrerPolicy(referrer ->
                referrer.policy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN));
        headers.xssProtection(xss ->
                xss.headerValue(XXssProtectionHeaderWriter.HeaderValue.ENABLED_MODE_BLOCK));

        if (environment.acceptsProfiles(Profiles.of("prod"))) {
            headers.httpStrictTransportSecurity(hsts ->
                    hsts.maxAgeInSeconds(31_536_000).includeSubDomains(true));
        }
    }
}
