plugins {
    id("com.android.library")
    id("org.jetbrains.kotlin.android") version "1.9.0"
    id("maven-publish")
}

android {
    namespace = "dev.kushalkhadka.nepalidatepicker"
    compileSdk = 34

    defaultConfig {
        minSdk = 24
        targetSdk = 34
        version = "1.2.0"
    }

    buildFeatures { compose = true }
    composeOptions { kotlinCompilerExtensionVersion = "1.5.1" }
}

dependencies {
    implementation("androidx.compose.ui:ui:1.6.0")
    implementation("androidx.compose.material3:material3:1.2.0")
    implementation("androidx.compose.runtime:runtime:1.6.0")
    implementation("androidx.webkit:webkit:1.10.0")
}

publishing {
    publications {
        create<MavenPublication>("release") {
            groupId    = "dev.kushalkhadka"
            artifactId = "nepali-datepicker-studio"
            version    = "1.2.0"
        }
    }
}
